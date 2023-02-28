import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';

interface User{
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    email: string,
    password: string,
    phone: string,
    city: string,
    state: string,
    role: string,
    address: string,
    society?: string,
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

  export const createUser =CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const{firstName, lastName, gender, dateOfBirth, email, password, phone, city, address, society }: User = req.body;
    console.log("User :",(req as any).user)
    //Check for required fields 
    if(!(email ||password || phone || firstName || lastName || gender))return next(createCustomError('Enter all mandatory fields.', 401));

    //Check if user exists
    if(await User.findOne({isDeleted: false, email})) return next(createCustomError('User with this email already exists. Please login with existing email.', 401));
    const user = await User.create({firstName, lastName, gender, dateOfBirth, email, password, phone, city, society, address });

    if(!user) return next(createCustomError('Couldn\'t create user', 400));

    res.status(201).json({status: "success", data:user});
    
});

export const getUsers = CatchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const users = await User.find({isDeleted: false})
    .populate({path : "role", select: "roleName"});

    if(!users) return next(createCustomError('No users found.', 404));
    
    res.status(200).json({status:"success", data: users, results: users.length});

});
export const deleteUser = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const {id} = req.params;

    const filter = { _id: id };
    const update = { $set: { isDeleted: true } };

    try{
        const userDetail = await User.updateOne(filter, update);
        console.log("this is userdetail", userDetail);
        res.status(200).json({massage : "data delete succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }    
    
});

export const getUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await User.findOne({_id: id, isDeleted: false}).select('-__v -password')
    .populate({path : "role", select: "roleName"});

    if(!user) return next(createCustomError('No such user found.', 404));
    
    res.status(200).json({status:"success", data: user});

});

export const editUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const{firstName, lastName, gender, dateOfBirth, email, password, phone, city, state, address }: User = req.body;
    const user = await User.findOne({_id: id, isDeleted: false}).select('-__v -password -role');

    if(!user) return next(createCustomError('No such user found.', 404));

    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email', 'phone', 'profilePhoto', 'city', 'society', 'dateOfBirth', 'lastModifiedBy', 'address', 'gender');
    
    filteredBody.lastModifiedBy = id;
    if ((req as any).file) filteredBody.profilePhoto = (req as any).profilePhotoUrl;

    
    const updatedUser = await User.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
      }).select('-__v -password -role');
    res.status(200).json({status: "success", data:updatedUser});

});
