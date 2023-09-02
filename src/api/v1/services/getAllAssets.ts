import { Request, Response } from 'express';
import Asset from '../models/Asset';
import User from '../models/User';
import { InvalidUser } from '../../../exceptions/InvalidUser';

export const getAllAssets = async(username: string) => {
    const user = await User.findOne({ where: {username} });
    if (!user) {
        throw new InvalidUser("Username not registered", 404);
    }
    const assets = await Asset.findAll({ where: { username } });
    return assets;
};