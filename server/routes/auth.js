import { Router } from 'express';
import { register, login, checkAvailability } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check', checkAvailability);

export default router;
