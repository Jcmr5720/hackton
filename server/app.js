import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import reservationRoutes from './routes/reservations.js';
import productRoutes from './routes/products.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);
app.use('/products', productRoutes);

export default app;
