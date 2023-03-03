import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {getHomeChef, getHomeChefs,createHomeChef, editHomeChef, deleteHomeChef} from '../controllers/homeChefController';
import HomeChef from '../models/HomeChef';
import User from '../models/User';

const router = express.Router();
const currentHomeChef = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user._id;
    next(); 
}
router.route('/').get(getHomeChefs).post(protect(User),createHomeChef);
router.route('/login').post(login(HomeChef));
router.route('/signup').post(signup(HomeChef));
router.route('/me').get(protect(HomeChef),currentHomeChef, getHomeChef).patch(protect(HomeChef), currentHomeChef, editHomeChef)
.delete(protect(HomeChef),currentHomeChef, deleteHomeChef);
router.route('/:id').get(protect(User), getHomeChef).patch(protect(User),editHomeChef).delete(protect(User), deleteHomeChef);


export default router;