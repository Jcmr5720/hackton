import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import reservationRoutes from './routes/reservations.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);

export default app;
