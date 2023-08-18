import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

/* Routes */
import userRoutes from './api/v1/routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
 
export default app;