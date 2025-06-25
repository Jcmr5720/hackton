import express from 'express';
import authRoutes from './routes/auth.js';
import reservationRoutes from './routes/reservations.js';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);

export default app;
