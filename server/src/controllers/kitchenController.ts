import { Request, Response, NextFunction } from 'express';
import Kitchen from '../models/Kitchen';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';

interface Kitchen{
    kitchenName: string,
    homeChef: string,
    kitchenType: string,
    email: string,
    phone: string,
    city: string,
    address: string,
    society?: string,
    description?:string
}

const filterObj = <T extends object>(obj: T, ...allowedFields: (keyof T| string)[]): Partial<T> => {
    const newObj: Partial<T> = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el as keyof T) && 
      (obj[el as keyof T] !== null && 
        obj[el as keyof T] !== undefined && 
        obj[el as keyof T] !== '')) { 
            newObj[el as keyof T] = obj[el as keyof T];}
    });
    return newObj;
  };

  export const createKitchen =CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const{kitchenName, kitchenType, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable, 
        deliveryChargeType, deliveryCharge, costForTwo, email, phone, city, address, society, 
        description, homeChef, kitchenPinCode} = req.body;
    //Check for required fields 
    if(!(kitchenName ||phone || homeChef || society))return next(createCustomError('Enter all mandatory fields.', 400));

    //Check if user exists
    if(await Kitchen.findOne({isDeleted: false, email, society})) return next(createCustomError('User with this email already exists. Please login with existing email.', 401));
    const kitchen = await Kitchen.create({kitchenName, kitchenType, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable, 
        deliveryChargeType, deliveryCharge, costForTwo, email, phone, city, address, society, 
        description, homeChef, kitchenPinCode});

    if(!kitchen) return next(createCustomError('Couldn\'t create kithcen', 400));

    res.status(201).json({status: "success", data:kitchen});
    
});

export const getKitchens = CatchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const kitchens = await Kitchen.find({isDeleted: false})


    if(!kitchens) return next(createCustomError('No users found.', 404));
    
    res.status(200).json({status:"success", data: kitchens, results: kitchens.length});

});
export const deleteKitchen = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const {id} = req.params;

    const filter = { _id: id };
    const update = { $set: { isDeleted: true } };

    try{
        const kitchen = await Kitchen.updateOne(filter, update);
        // console.log("this is kitchen", kitchen);
        res.status(200).json({message : "kitchen deleted succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete kitchen"});
    }    
    
});

export const getKitchen = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const kitchen = await Kitchen.findOne({_id: id, isDeleted: false}).select('-__v');

    if(!kitchen) return next(createCustomError('No such user found.', 404));
    
    res.status(200).json({status:"success", data: kitchen});

});

export const editKitchen = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await Kitchen.findOne({_id: id}).select('-__v');

    if(!user) return next(createCustomError('No such user found.', 404));

    const filteredBody = filterObj(req.body, 'kitchenName', 'email', 'phone', 'city', 'society', 
    'lastModifiedBy', 'address', 'kitchenType', 'kitchenCuisine', 'description', 'foodlicenseNumber', 
    'discounts', 'foodMenu', 'gstApplicable', 'deliveryChargeType', 'deliveryCharge', 'costForTwo');
    
    filteredBody.lastModifiedBy = id;
    
    
    const updatedKitchen = await Kitchen.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
      }).select('-__v');
    res.status(200).json({status: "success", data:updatedKitchen});

});
