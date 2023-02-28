import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {getUser, editUser, deleteUser, createUser, getUsers} from '../controllers/userController';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/login').post(login);
router.route('/signup').post(signup);
router.use(protect);
router.route('/:id').get(getUser).patch(editUser).delete(deleteUser);
const currentUser = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user.id;
    next(); 
}
router.route('/me').get(currentUser, getUser).patch(currentUser, editUser).delete(currentUser, deleteUser);


export default router;