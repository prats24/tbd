import { Request, Response, NextFunction } from 'express';
import HomeChef from '../models/HomeChef';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';
import multer from 'multer';
import AWS from 'aws-sdk';
import sharp from 'sharp';

interface HomeChef{
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

const storage = multer.memoryStorage();
const fileFilter = (req: Request, file: Express.Multer.File, cb:any) => {
if (file.mimetype.startsWith("image/")) {
    cb(null, true);
} else {
    cb(new Error("Invalid file type"), false);
}
}
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
//     // accessKeyId: "AKIASR77BQMICZATCLPV",
//     // secretAccessKey: "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",
  
//   });
  
const upload = multer({ storage, fileFilter }).single("photo");
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);

export const uploadMulter = upload;

export const resizePhoto = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      // no file uploaded, skip to next middleware
      console.log('no file');
      next();
      return;
    }
    sharp(req.file.buffer).resize({ width: 400, height: 400 }).toBuffer()
    .then((resizedImageBuffer) => {
      req.file!.buffer = resizedImageBuffer;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error resizing photo" });
    });
}; 

export const uploadToS3 = async(req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      // no file uploaded, skip to next middleware
      next();
      return;
    }
  
    // create S3 upload parameters
    let homeChefName;
    if(req.body.firstName && req.body.lastName && req.body.phone){
        homeChefName = req.body.firstName + req.body.lastName + req.body.phone;
    }else{
        let homeChef = await HomeChef.findById(req.params.id);
        homeChefName = `${homeChef?.firstName}`+`${homeChef?.lastName}` + `${homeChef?.phone}` ;
    }
    const key = `homechefs/${homeChefName}/photos/${(Date.now()) + req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    };
  
    // upload image to S3 bucket
    
    s3.upload((params as any)).promise()
      .then((s3Data) => {
        console.log('file uploaded');
        (req as any).uploadUrl = s3Data.Location;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error uploading to S3" });
      });
  };


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

  export const createHomeChef =CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const{firstName, lastName, gender, dateOfBirth, email, password, phone, city, address, society, bankDetails, description, }: HomeChef = req.body;
    // console.log("User :",(req as any).user)
    const displayPhoto = (req as any).uploadUrl;
    console.log(displayPhoto);
    //Check for required fields 
    if(!(email ||password || phone || firstName || lastName || gender))return next(createCustomError('Enter all mandatory fields.', 400));

    //Check if user exists
    if(await HomeChef.findOne({isDeleted: false, email})) return next(createCustomError('User with this email already exists. Please login with existing email.', 401));
    const homeChef = await HomeChef.create({firstName, lastName, gender, dateOfBirth, email, password, 
        displayPhoto, phone, city, society, address });

    if(!homeChef) return next(createCustomError('Couldn\'t create user', 400));

    res.status(201).json({status: "success", data:homeChef});
    
});

export const getHomeChefs = CatchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const homeChefs = await HomeChef.find({isDeleted: false})


    if(!homeChefs) return next(createCustomError('No users found.', 404));
    
    res.status(200).json({status:"success", data: homeChefs, results: homeChefs.length});

});
export const deleteHomeChef = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const {id} = req.params;

    const filter = { _id: id };
    const update = { $set: { isDeleted: true } };

    try{
        const userDetail = await HomeChef.updateOne(filter, update);
        console.log("this is userdetail", userDetail);
        res.status(200).json({massage : "data delete succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }    
    
});

export const getHomeChef = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await HomeChef.findOne({_id: id, isDeleted: false}).select('-__v -password');

    if(!user) return next(createCustomError('No such user found.', 404));
    
    res.status(200).json({status:"success", data: user});

});

export const editHomeChef = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const{firstName, lastName, gender, dateOfBirth, email, password, phone, city, state, address }: HomeChef = req.body;
    const user = await HomeChef.findOne({_id: id}).select('-__v -password -role');

    if(!user) return next(createCustomError('No such user found.', 404));

    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email', 'phone', 'profilePhoto', 'city', 'society', 'dateOfBirth', 'lastModifiedBy', 'address', 'gender');
    
    filteredBody.lastModifiedBy = id;
    if ((req as any).file) filteredBody.profilePhoto = (req as any).profilePhotoUrl;

    
    const updatedHomeChef = await HomeChef.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
      }).select('-__v -password -role');
    res.status(200).json({status: "success", data:updatedHomeChef});

});
