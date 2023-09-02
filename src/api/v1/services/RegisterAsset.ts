import Asset from '../models/Asset'
import { RegisterError } from '../../../exceptions/RegisterError';
import { ForeignKeyConstraintError } from 'sequelize';

export class RegisterAsset {
    static async register(username: string, ticker: string, quantity: number, price: number) {
        try {
            const asset = await Asset.create({
                username: username,
                ticker: ticker,
                quantity: quantity,
                price: price
            })
            return asset;
        } catch (error) {
            if (error instanceof ForeignKeyConstraintError) {
                throw new RegisterError("Username not registered.", 404);
            }
            else {
                throw new RegisterError("Unkown error. Please contact the administrators.", 500);
            }
        }
    }
}
