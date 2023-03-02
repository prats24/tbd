import { Request, Response, NextFunction } from 'express';
import Society from '../models/Society';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';
import multer from 'multer';
import AWS from 'aws-sdk';
import sharp from 'sharp';

interface Society{
    societyName: string,
    societyGeoLocation: [Number, Number]
    societyTowers: Number,
    societyPinCode:string,
    societyAddress: string,
    societyType: string,
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
    let societyName;
    if(req.body.societyName && req.body.societyPinCode){
        societyName = req.body.societyName + req.body.societyPinCode;
    }else{
        let society = await Society.findById(req.params.id);
        societyName = `${society?.societyName}`+`${society?.societyPinCode}`;
    }
    const key = `societies/${societyName}/photos/${(Date.now()) + req.file.originalname}`;
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

  export const createSociety = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const{societyName,
        societyGeoLocation,
        societyTowers,
        societyPinCode,
        societyAddress,
        societyType }: Society = req.body;
    const societyPhoto = (req as any).uploadUrl;     
    //Check for required fields 
    console.log(req.body);
    if(!(societyName || societyPinCode))return next(createCustomError('Enter all mandatory fields.', 401));

    //Check if user exists
    if(await Society.findOne({isDeleted: false, societyName, societyPinCode})) return next(createCustomError('Society with this email already exists. Please edit the existing society.', 401));
    const society = await Society.create({societyName, societyPinCode, societyGeoLocation, createdBy: (req as any).user._id, 
        societyTowers, societyAddress, societyPhoto});

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
    if(req.file) filteredBody.societyPhoto = (req as any).uploadUrl;
    
    const updatedSociety = await Society.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
      }).select('-__v');
    res.status(200).json({status: "success", data:updatedSociety});
});
