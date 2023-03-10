import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {getCuisines, getCuisine, editCuisine, deleteCuisine, createCuisine, 
    uploadMulter, uploadToS3, resizePhoto} from '../controllers/cuisineController';
import Cuisine from '../models/Cuisine';
import User from '../models/User';
import Kitchen from '../models/Kitchen';

const router = express.Router();
const currentCuisine = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user._id;
    next(); 
}
router.route('/').get(getCuisines).post(protect(User),uploadMulter, resizePhoto, uploadToS3 ,createCuisine);
router.route('/:id').get(protect(User), getCuisine).patch(protect(User),uploadMulter, resizePhoto, 
uploadToS3,editCuisine).delete(protect(User), deleteCuisine);


export default router;