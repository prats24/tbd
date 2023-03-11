import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
// import {getCarousels, getCarousel, editCarousel, deleteCarousel, createCarousel, 
//     uploadMulter, uploadToS3, resizePhoto, getActiveCarousels} from '../controllers/carouselController';
import { createMenuItem , getMenuItems, getMenuItem, editMenuItem, uploadMulter, uploadToS3, 
    resizePhoto} from '../controllers/menuItemController';    
import Carousel from '../models/Carousel';
import User from '../models/User';
import Kitchen from '../models/Kitchen';

const router = express.Router();
// const currentHomeChef = (req: Request,res: Response,next:NextFunction) =>{
//     req.params.id = (req as any).user._id;
//     next(); 
// }
router.route('/').post(uploadMulter, resizePhoto, uploadToS3, createMenuItem).get(getMenuItems);
router.route('/:id').get(getMenuItem).patch(uploadMulter, resizePhoto, uploadToS3, createMenuItem, editMenuItem).delete();


export default router;