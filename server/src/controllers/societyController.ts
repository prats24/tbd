import { Request, Response, NextFunction } from 'express';
import Society from '../models/Society';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';

interface Society{
    societyName: string,
    societyGeoLocation: [Number, Number]
    societyTowers: Number,
    societyPinCode:string,
    societyAddress: string,
    societyType: string,
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

  export const createSociety = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const{societyName,
        societyGeoLocation,
        societyTowers,
        societyPinCode,
        societyAddress,
        societyType }: Society = req.body;
    //Check for required fields 
    if(!(societyName || societyPinCode))return next(createCustomError('Enter all mandatory fields.', 401));

    //Check if user exists
    if(await Society.findOne({isDeleted: false, societyName, societyPinCode})) return next(createCustomError('Society with this email already exists. Please edit the existing society.', 401));
    const society = await Society.create({societyName, societyPinCode, societyGeoLocation, createdBy: (req as any).user._id, 
        societyTowers, societyAddress});

    if(!society) return next(createCustomError('Couldn\'t create user', 400));

    res.status(201).json({status: "success", data:society});
    
});

export const getSocieties = CatchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    console.log('here');
    const societies = await Society.find({isDeleted: false});


    if(!societies) return next(createCustomError('No societies found.', 404));
    
    res.status(200).json({status:"success", data: societies, results: societies.length});

});
export const deleteSociety = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const {id} = req.params;

    const filter = { _id: id };
    const update = { $set: { isDeleted: true } };

    try{
        const society = await Society.updateOne(filter, update);
        res.status(200).json({message : "Society deleted succesfully"});
    } catch (e){
        res.status(401).json({error:"Failed to delete data"});
    }    
    
});

export const getSociety = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const society = await Society.findOne({_id: id, isDeleted: false}).select('-__v');

    if(!society) return next(createCustomError('No such society found.', 404));
    
    res.status(200).json({status:"success", data: society});

});

export const editSociety = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const{societyName,
        societyGeoLocation,
        societyTowers,
        societyPinCode,
        societyAddress,
        societyType }: Society = req.body;
    const society = await Society.findOne({_id: id, isDeleted: false}).select('-__v');

    if(!society) return next(createCustomError('No such user found.', 404));

    const filteredBody = filterObj(req.body, 'societyName', 'societyGeoLocation', 'societyTowers', 'societyTowers',
    'societyPinCode', 'societyAddress', 'societyType');
    
    filteredBody.lastModifiedBy = id;
    
    const updatedSociety = await Society.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
      }).select('-__v');
    res.status(200).json({status: "success", data:updatedSociety});
});
