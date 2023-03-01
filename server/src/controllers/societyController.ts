import { Request, Response, NextFunction } from 'express';
import Society from '../models/Society';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';
import homeChef from '../models/HomeChef';

interface Society{
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    email: string,
    bankDetails:Object
    password: string,
    phone: string,
    city: string,
    state: string,
    role: string,
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

  export const createSociety =CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const{firstName, lastName, gender, dateOfBirth, email, password, phone, city, address, society, 
        bankDetails, description, }: Society = req.body;
    console.log("User :",(req as any).user)
    //Check for required fields 
    if(!(email ||password || phone || firstName || lastName || gender))return next(createCustomError('Enter all mandatory fields.', 401));

    //Check if user exists
    if(await Society.findOne({isDeleted: false, email})) return next(createCustomError('User with this email already exists. Please login with existing email.', 401));
    const homeChef = await Society.create({firstName, lastName, gender, dateOfBirth, email, password, phone, city, society, address });

    if(!homeChef) return next(createCustomError('Couldn\'t create user', 400));

    res.status(201).json({status: "success", data:homeChef});
    
});

export const getSocieties = CatchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const homeChefs = await Society.find({isDeleted: false})


    if(!homeChefs) return next(createCustomError('No users found.', 404));
    
    res.status(200).json({status:"success", data: homeChefs, results: homeChefs.length});

});
export const deleteSociety = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const {id} = req.params;

    const filter = { _id: id };
    const update = { $set: { isDeleted: true } };

    try{
        const userDetail = await Society.updateOne(filter, update);
        console.log("this is userdetail", userDetail);
        res.status(200).json({massage : "data delete succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }    
    
});

export const getSociery = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await Society.findOne({_id: id, isDeleted: false}).select('-__v -password')
    .populate({path : "role", select: "roleName"});

    if(!user) return next(createCustomError('No such user found.', 404));
    
    res.status(200).json({status:"success", data: user});

});

export const editSociety = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const{firstName, lastName, gender, dateOfBirth, email, password, phone, city, state, address }: Society = req.body;
    const user = await Society.findOne({_id: id, isDeleted: false}).select('-__v -password -role');

    if(!user) return next(createCustomError('No such user found.', 404));

    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email', 'phone', 'profilePhoto', 'city', 'society', 'dateOfBirth', 'lastModifiedBy', 'address', 'gender');
    
    filteredBody.lastModifiedBy = id;
    if ((req as any).file) filteredBody.profilePhoto = (req as any).profilePhotoUrl;

    
    const updatedHomeChef = await Society.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
      }).select('-__v -password -role');
    res.status(200).json({status: "success", data:updatedHomeChef});

});
