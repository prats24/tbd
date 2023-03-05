import { Request, Response, NextFunction } from 'express';
import Kitchen from '../models/Kitchen';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';
import sharp from 'sharp';
import multer from 'multer';
import AWS from 'aws-sdk';

interface Kitchen{
    kitchenName: string,
    homeChef: string,
    kitchenType: string,
    kitchenCuisine: [string],
    email: string,
    liveDate: Date,
    phone: string,
    flatNo: string,
    floor: string,
    tower: string,
    costForOne: Number,
    deliveryCharges: Number,
    deliveryChargeType: string,
    society?: string,
    status: string,
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
  
const upload = multer({ storage, fileFilter }).single("displayPhoto");
const uploadMultiple = multer({ storage, fileFilter}).fields([{ name: 'displayPhoto', maxCount: 1 }, 
{ name: 'coverPhoto', maxCount: 1 }]);

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);

export const uploadMulter = upload;
export const uploadMulterMultiple = uploadMultiple;

export const resizePhoto = async (req: Request, res: Response, next: NextFunction) => {
    console.log('files', req.files);
    console.log('file', req.file);
    if (!req.files) {
      // no file uploaded, skip to next middleware
      console.log('no file');
      next();
      return;
    }
    const { displayPhoto, coverPhoto } = (req.files)as any;

    if (displayPhoto && displayPhoto[0].buffer) {
        const resizedDisplayPhoto = await sharp(displayPhoto[0].buffer)
          .resize({ width: 500, height: 500 })
          .toBuffer();
        (req.files as any).displayPhotoBuffer = resizedDisplayPhoto;
      }
    
      if (coverPhoto && coverPhoto[0].buffer) {
        const resizedCoverPhoto = await sharp(coverPhoto[0].buffer)
          .resize({ width: 1000, height: 500 })
          .toBuffer();
          (req.files as any).coverPhotoBuffer = resizedCoverPhoto;
      }
      next();
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
        let kitchen = await Kitchen.findById(req.params.id);
        homeChefName = `${kitchen?.kitchenName}` ;
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

  export const createKitchen =CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    console.log('createKitchen', req.body);
    const{kitchenName, kitchenType,liveDate, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable, 
        deliveryChargeType, deliveryCharges, costForOne, email, phone, flatNo, floor,tower, society, 
        description,status, homeChef} = req.body;
    //Check for required fields 
    if(!(kitchenName ||phone || homeChef || society))return next(createCustomError('Enter all mandatory fields.', 400));

    //Check if user exists
    if(await Kitchen.findOne({isDeleted: false, email, society})) return next(createCustomError('User with this email already exists. Please login with existing email.', 401));
    const kitchen = await Kitchen.create({kitchenName, kitchenType,liveDate, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable, 
        deliveryChargeType, deliveryCharges, costForOne, email, phone, flatNo,floor, tower, society, 
        description,status, homeChef});

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
