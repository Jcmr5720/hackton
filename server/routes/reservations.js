import { Router } from 'express';
import { spawn } from 'child_process';

const router = Router();

router.post('/', (req, res) => {
  const py = spawn('python3', ['python/reservation_api.py']);
  let out = '';
  let err = '';
  py.stdout.on('data', data => {
    out += data.toString();
  });
  py.stderr.on('data', data => {
    err += data.toString();
  });
  py.on('close', code => {
    if (code === 0) {
      try {
        const result = JSON.parse(out.trim());
        if (result.error) {
          res.status(400).json({ error: result.error });
        } else {
          res.json({ id: result.id });
        }
      } catch (e) {
        res.status(500).json({ error: 'Failed to parse response' });
      }
    } else {
      res.status(500).json({ error: err || 'Reservation failed' });
    }
  });
  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();
});

export default router;
