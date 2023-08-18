import express, { Request, Response, NextFunction } from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/all', userController.getAllUsers);
router.post('/create', userController.createUser);

export default router;