import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {getCarousels, getCarousel, editCarousel, deleteCarousel, createCarousel, 
    uploadMulter, uploadToS3, resizePhoto} from '../controllers/carouselController';
import Carousel from '../models/Carousel';
import User from '../models/User';
import Kitchen from '../models/Kitchen';

const router = express.Router();
const currentHomeChef = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user._id;
    next(); 
}
router.route('/').get(getCarousels).post(protect(User),uploadMulter, resizePhoto, uploadToS3 ,createCarousel);
router.route('/:id').get(protect(User), getCarousel).patch(protect(User),uploadMulter, resizePhoto, 
uploadToS3,editCarousel).delete(protect(User), deleteCarousel);


export default router;