import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {getUser, editUser, deleteUser, createUser, getUsers} from '../controllers/userController';
import HomeChef from '../models/HomeChef';

const router = express.Router();
const currentHomeChef = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user._id;
    next(); 
}
router.route('/').get(getUsers).post(createUser);
router.route('/login').post(login(HomeChef));
router.route('/signup').post(signup(HomeChef));
router.use(protect(HomeChef));
router.route('/me').get(currentHomeChef, getUser).patch(currentHomeChef, editUser).delete(currentHomeChef, deleteUser);
router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);


export default router;