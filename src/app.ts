import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

/* Routes */
import userRoutes from './api/v1/routes/userRoutes';
import assetRoutes from './api/v1/routes/assetRoutes'

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/assets', assetRoutes)
 
export default app;