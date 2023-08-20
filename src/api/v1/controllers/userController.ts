import { Request, Response } from 'express';
import { RegisterUser } from '../services/RegisterUser';
import User from '../models/User';

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const newUser = await RegisterUser.register(username, email, password);
            if(newUser instanceof User) {
                res.status(200).json(newUser);
            }
            else {
                if(newUser.error) {
                    res.status(newUser.status).json({ error : newUser.error });
                }
                else {
                    res.status(500).json({ error: "Unkown error. Please contact the administrators." })
                }
            }
        } catch (error) {
            res.status(500).json({ error: "An error occurred while creating the user. Please try again later." });   
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
}

export default new UserController();