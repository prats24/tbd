import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {createKitchen, deleteKitchen, editKitchen, getKitchen, getKitchens, 
    uploadMulterMultiple, resizePhoto} from '../controllers/kitchenController';
import User from '../models/User';
import Kitchen from '../models/Kitchen';

const router = express.Router();
const currentKitchen = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user._id;
    next(); 
}
router.route('/').get(getKitchens).post(protect(User),uploadMulterMultiple, resizePhoto, createKitchen);
router.route('/mykitchen/:id').get(protect(Kitchen), getKitchen).patch(protect(Kitchen), editKitchen).delete(protect(Kitchen), deleteKitchen);
router.route('/:id').get(protect(User), getKitchen).patch(protect(User),editKitchen).delete(protect(User), deleteKitchen);


export default router;