import express, { Request, Response, NextFunction } from 'express';
import {fieldsVerification} from '../middlewares/userFieldsVerification';
import assetController from '../controllers/assetController';

const router = express.Router();

router.post('/create', fieldsVerification(["username", "ticker", "quantity", "price"]), assetController.createAsset);
router.post('/userAssets', fieldsVerification(["username"]), assetController.consultAssets);

export default router;