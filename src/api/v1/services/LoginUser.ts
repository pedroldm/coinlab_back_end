import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken';import dotenv from 'dotenv';
import { AuthenticationError } from '../../../exceptions/AuthenticationError';

dotenv.config();

export class LoginUser {
    static async login(username: string = '', email: string = '', password: string) {
        let user = undefined;
        if(username) 
            user = await User.findOne({ where: { username: username } });
        else if(email) 
            user = await User.findOne({ where: { email: email }});
        else 
            throw new AuthenticationError("Missing log-in identifier (username or e-mail).", 500);

        if (!user)
            throw new AuthenticationError("User not found.", 404);

        if(await bcrypt.compare(password, user.password)) {
            if(process.env.API_ACCESS_TOKEN_SECRET && process.env.API_TOKEN_EXPIRES) {
                const JWToken = jwt.sign({ id: user.id }, process.env.API_ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.API_TOKEN_EXPIRES
                });
                return JWToken;
            }
        }
        else
            throw new AuthenticationError("Incorrect password.", 401);
    }
}