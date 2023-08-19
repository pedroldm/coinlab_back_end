import User from '../models/user';
import { UniqueConstraintError } from 'sequelize';
import bcrypt from 'bcrypt';
import { Utils } from '../../../utils/utils';
import { InvalidRegisterField } from '../../../exceptions/invalidUserFields';

class RegisterUser {
    async createUser(username: string, email: string, password: string) {
        try {
            this.userFieldsVerification(username, email, password);
            const encrypted = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, email, password: encrypted });
            return newUser;
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const errorMessage = this.getErrorMessageForViolatedFields(error.fields);
                return { status: 409, error: errorMessage };
            } else if (error instanceof InvalidRegisterField) {
                return { status: 400, error: error.message }
            }
            else {
                return { status: 500, error: "An error occurred while creating the user. Please try again later." };
            }
        }
    }

    private getErrorMessageForViolatedFields(violatedFields: any): string {
        if (violatedFields.username) {
            return "Username already exists";
        } else if (violatedFields.email) {
            return "E-mail already exists";
        } else {
            return "Duplicate entry found";
        }
    }

    private userFieldsVerification(username: string, email: string, password: string) {
        if(!Utils.validateEmail(email)) throw new InvalidRegisterField("Invalid e-mail");
    }
}

export default new RegisterUser();