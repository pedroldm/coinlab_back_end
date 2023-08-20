import { Request, Response } from 'express';
import { RegisterUser } from '../services/RegisterUser';
import { LoginUser } from '../services/LoginUser';
import User from '../models/User';
import { RegisterError } from '../../../exceptions/RegisterError';
import { AuthenticationError } from '../../../exceptions/AuthenticationError';

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const newUser = await RegisterUser.register(username, email, password);
            if(newUser instanceof User)
                res.status(200).json({ username: username, email: email });
            else
                res.status(500).json({ error: "Unkown error. Please contact the administrators." })
        } catch (error) {
            if(error instanceof RegisterError)
                res.status(error.statusCode).json({ error: error.message });
            else
                res.status(500).json({ error: "Unkown error. Please contact the administrators." })
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = await User.findAll();
            res.status(200).json(allUsers);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while consulting users. Pleasy try again later." });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const JWToken = await LoginUser.login(username, email, password);
            console.log(JWToken);
            res.status(200).json({ token: JWToken })
        } catch (error) {
            if(error instanceof AuthenticationError)
                res.status(error.statusCode).json({ error: error.message })
            else
                res.status(500).json({ error: "Unkown error. Please contact the administrators." })
        }
    }
}

export default new UserController();