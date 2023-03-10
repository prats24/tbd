import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';

export const getOrders = CatchAsync(async(req:Request, res:Response, next: NextFunction) => {
    const orders  = await Order.find();


    res.status(200).json({
        status:"success",
        data:orders,
        results: orders.length
    });
});

export const getOrder = CatchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const id = req.params.id;

    const order = await Order.findById(id);
    res.status(200).json({
        status:"success",
        data:order,
    });
}); 

export const createOrder = CatchAsync(async(req:Request, res:Response, next: NextFunction) => {
    
    const {orderedBy, orderStatus, orderKitchen, orderSociety, orderInstructions, orderDeliverySlot, 
        orderDeliveryCharge, orderItemAmount, orderPackagingCharge, orderMenuItems, orderGstCharge, 
        orderTime,
    } = req.body;
    let orderTotalAmount = orderItemAmount + orderGstCharge??0 + orderDeliveryCharge??0 + orderPackagingCharge??0;
    const order = await Order.create({orderedBy, orderStatus, orderKitchen, orderSociety, orderInstructions, orderDeliverySlot, 
        orderDeliveryCharge, orderItemAmount, orderPackagingCharge, orderMenuItems, orderGstCharge, 
        orderTime, orderTotalAmount});
    res.status(200).json({
        status:"success",
        data:order,
    });
});
