import { InvalidUser } from "../../../exceptions/InvalidUser";
import { RegisterError } from "../../../exceptions/RegisterError";
import { RegisterAsset } from "../services/RegisterAsset";
import { getAllAssets } from "../services/getAllAssets";

class AssetController {
    async createAsset(req: Request, res: Response) {
        try {
            const { username, ticker, quantity, price } = req.body;
            const newAsset = await RegisterAsset.register(username, ticker, quantity, price);
            res.status(200).json(newAsset)
        } catch (error) {
            if (error instanceof RegisterError) {
                res.status(error.statusCode).json({"message": error.message})
            }
        }
    }

    async consultAssets(req: Request, res: Response) {
        try {
            const { username } = req.body;
            const allAssets = await getAllAssets(username);
            res.status(200).json(allAssets);
        } catch (error) {
            if (error instanceof InvalidUser) {
                res.status(error.statusCode).json({"message": error.message})
            }
        }
    }
}

export default new AssetController();