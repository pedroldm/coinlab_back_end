import User from '../models/user';
import { UniqueConstraintError } from 'sequelize';

class RegisterUser {
    async createUser(username: string, email: string) {
        try {
            const newUser = await User.create({ username, email });
            return newUser;
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const errorMessage = this.getErrorMessageForViolatedFields(error.fields);
                return { error: errorMessage };
            } else {
                return { error: "An error occurred while creating the user. Please try again later." };
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
}

export default new RegisterUser();