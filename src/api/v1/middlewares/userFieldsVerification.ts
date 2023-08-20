import express from 'express';
import { Utils } from '../../../utils/Utils'

export function fieldsVerification(requiredKeys: string[]) {
    return function userFieldsVerification(req: express.Request, res: express.Response, next: express.NextFunction) {
        if(!Object.keys(req.body).length)
            return res.status(400).json({ error: 'Invalid JSON' });

        for (const key of requiredKeys) {
            if (!req.body.hasOwnProperty(key)) {
                return res.status(400).json({ error: `${key.charAt(0).toUpperCase() + key.slice(1)} not informed.` });
            }
        }

        next();
    }
}

export function validEmailVerify(req: express.Request, res: express.Response, next: express.NextFunction) {
    if(!Utils.validateEmail(req.body.email))
        return res.status(400).json({ error: `${req.body.email} is not a valid e-mail.`});

    next();
}
