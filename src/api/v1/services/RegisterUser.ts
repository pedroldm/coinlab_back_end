import User from '../models/User';
import { UniqueConstraintError } from 'sequelize';
import bcrypt from 'bcrypt';
import { RegisterError } from '../../../exceptions/RegisterError';

export class RegisterUser {
    static async register(username: string, email: string, password: string) {
        try {
            const encrypted = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, email, password: encrypted });
            return newUser;
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const errorMessage = this.getErrorMessageForViolatedFields(error.fields);
                throw new RegisterError(errorMessage, 409);
            } else {
                throw new RegisterError("Unkown error. Please contact the administrators.", 500);
            }
        }
    }

    private static getErrorMessageForViolatedFields(violatedFields: any): string {
        if (violatedFields.username) {
            return "Username already exists";
        } else if (violatedFields.email) {
            return "E-mail already exists";
        } else {
            return "Duplicate entry found";
        }
    }
}
