import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import User from '../models/User';
import Kitchen from '../models/Kitchen';
import { getOrders, createOrder, getOrder } from '../controllers/orderController';

const router = express.Router();
const currentHomeChef = (req: Request,res: Response,next:NextFunction) =>{
    req.params.id = (req as any).user._id;
    next(); 
}
router.route('/').get(getOrders).post(createOrder);
router.route('/:id').get(getOrder).patch();


export default router;