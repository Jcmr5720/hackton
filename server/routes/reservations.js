import { Router } from 'express'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const router = Router()

router.post('/', (req, res) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const scriptPath = path.join(__dirname, '..', '..', 'python', 'create_reservation.py')
  const child = spawn('python', [scriptPath])

  child.stdin.write(JSON.stringify(req.body))
  child.stdin.end()

  let output = ''
  let errorOutput = ''
  child.stdout.on('data', data => {
    output += data.toString()
  })
  child.stderr.on('data', data => {
    errorOutput += data.toString()
  })

  child.on('close', code => {
    if (code === 0) {
      try {
        const result = JSON.parse(output)
        res.json(result)
      } catch (err) {
        res.status(500).json({ error: 'Error procesando la reserva' })
      }
    } else {
      try {
        const err = JSON.parse(output || errorOutput)
        res.status(400).json(err)
      } catch (e) {
        res.status(500).json({ error: errorOutput || 'Error procesando la reserva' })
      }
    }
  })
})

export default router
