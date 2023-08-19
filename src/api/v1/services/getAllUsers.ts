import { Request, Response } from 'express';
import User from '../models/user';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        return { error: "Error consulting users" };
    }
};