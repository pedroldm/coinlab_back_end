import express, { Request, Response, NextFunction } from 'express';
import userController from '../controllers/userController';
import {fieldsVerification, validEmailVerify} from '../middlewares/userFieldsVerification';

const router = express.Router();

router.get('/all', userController.getAllUsers);
router.post('/create', fieldsVerification(["username", "email", "password"]), validEmailVerify, userController.createUser);

export default router;