import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {createKitchen, deleteKitchen, editKitchen, getKitchen, getKitchens} from '../controllers/kitchenController';
import HomeChef from '../models/HomeChef';
import User from '../models/User';
import Kitchen from '../models/Kitchen';

const router = express.Router();
const currentHomeChef = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user._id;
    next(); 
}
router.route('/').get(getKitchens).post(protect(User),createKitchen);
router.route('/mykitchen/:id').get(protect(HomeChef), getKitchen).patch(protect(HomeChef), editKitchen).delete(protect(HomeChef), deleteKitchen);
router.route('/:id').get(protect(User), getKitchen).patch(protect(User),editKitchen).delete(protect(User), deleteKitchen);


export default router;