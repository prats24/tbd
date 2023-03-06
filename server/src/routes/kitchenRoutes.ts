import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {createKitchen, deleteKitchen, editKitchen, getKitchen, getKitchens, 
<<<<<<< HEAD
    uploadMulterMultiple, resizePhoto, uploadToS3} from '../controllers/kitchenController';
import HomeChef from '../models/HomeChef';
=======
    uploadMulterMultiple, resizePhoto} from '../controllers/kitchenController';
>>>>>>> 08d17ddf16a102d80cd38ae93b1221ec79cb47f3
import User from '../models/User';
import Kitchen from '../models/Kitchen';

const router = express.Router();
const currentKitchen = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user._id;
    next();
}
<<<<<<< HEAD
router.route('/').get(getKitchens).post(protect(User),uploadMulterMultiple, resizePhoto, uploadToS3, createKitchen);
router.route('/mykitchen/:id').get(protect(HomeChef), getKitchen).patch(protect(HomeChef), editKitchen).delete(protect(HomeChef), deleteKitchen);
=======
router.route('/').get(getKitchens).post(protect(User),uploadMulterMultiple, resizePhoto, createKitchen);
router.route('/mykitchen/:id').get(protect(Kitchen), getKitchen).patch(protect(Kitchen), editKitchen).delete(protect(Kitchen), deleteKitchen);
>>>>>>> 08d17ddf16a102d80cd38ae93b1221ec79cb47f3
router.route('/:id').get(protect(User), getKitchen).patch(protect(User),editKitchen).delete(protect(User), deleteKitchen);


export default router;