import { Request, Response, NextFunction } from 'express';
import Cuisine from '../models/Cuisine';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';
import multer from 'multer';
import AWS from 'aws-sdk';
import sharp from 'sharp';

interface cuisine{
    cuisineName: string,
    description: string,
    cuisineIcon: Date,
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
  
const upload = multer({ storage, fileFilter }).single("cuisineIcon");
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
    sharp(req.file.buffer).resize({ width: 600}).toBuffer()
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
    let cuisineName;
    if(req.body.cuisineName){
      cuisineName = req.body.cuisineName;
    }else{
        let cuisine = await Cuisine.findById(req.params.id);
        cuisineName = `${cuisine?.cuisineName}` ;
    }
    const key = `cuisines/${cuisineName}/photos/${(Date.now()) + req.file.originalname}`;
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
        console.log(s3Data.Location);
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

  export const createCuisine =CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const{cuisineName, description, status} = req.body;
    const cuisineIcon = (req as any).uploadUrl;

    console.log(req.body);
    //Check for required fields 
    if(!(cuisineName))return next(createCustomError('Enter all mandatory fields.', 400));

    //Check if user exists
    // if(await carousel.findOne({isDeleted: false, email})) return next(createCustomError('User with this email already exists. Please login with existing email.', 401));
    const cuisine = await Cuisine.create({cuisineName, description,status,
      createdBy: (req as any).user._id, cuisineIcon});

    if(!cuisine) return next(createCustomError('Couldn\'t create cuisine', 400));

    res.status(201).json({status: "success", data:cuisine});
    
});

export const getCuisines = CatchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const cuisines = await Cuisine.find({isDeleted: false}).sort({status:1});


    if(!cuisines) return next(createCustomError('No users found.', 404));
    
    res.status(200).json({status:"success", data: cuisines, results: cuisines.length});

});
export const deleteCuisine = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const {id} = req.params;

    const filter = { _id: id };
    const update = { isDeleted: true };

    try{
        const userDetail = await Cuisine.findByIdAndUpdate(id, update);
        console.log("this is userdetail", userDetail);
        res.status(200).json({massage : "data delete succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }    
    
});

export const getCuisine = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await Cuisine.findOne({_id: id, isDeleted: false}).select('-__v -password')

    if(!user) return next(createCustomError('No such cuisine found.', 404));
    
    res.status(200).json({status:"success", data: user});

});

export const editCuisine = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const cuisine = await Cuisine.findOne({_id: id}).select('-__v -password -role');

    if(!cuisine) return next(createCustomError('No such cuisine found.', 404));

    const filteredBody = filterObj(req.body, 'cuisineName', 'description', 'status', 'lastModifiedBy');
    
    filteredBody.lastModifiedBy = id;
    console.log((req as any).puploadUrl);
    if ((req as any).file) filteredBody.cuisineIcon = (req as any).uploadUrl;

    
    const updatedCuisine = await Cuisine.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
      }).select('-__v -password -role');
    res.status(200).json({status: "success", data:updatedCuisine});

});
