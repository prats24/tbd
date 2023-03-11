import { Request, Response, NextFunction } from 'express';
import Carousel from '../models/Carousel';
import MenuItem from '../models/MenuItem';
import {createCustomError} from '../errors/customError';
import CatchAsync from '../middlewares/CatchAsync';
import multer from 'multer';
import AWS from 'aws-sdk';
import sharp from 'sharp';

interface carousel{
    carouselName: string,
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
  
const upload = multer({ storage, fileFilter }).single("dishPhoto");
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
    let menuItemName;
    if(req.body.menuItemName){
        menuItemName = req.body.menuItemName;
    }else{
        let menuItem = await MenuItem.findById(req.params.id);
        menuItemName = `${menuItem?.menuItemName}` ;
    }
    const key = `menuItems/${menuItemName}/photos/${(Date.now()) + req.file.originalname}`;
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

  export const createMenuItem =CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const{menuItemName, type, category, price, kitchen, status} = req.body;
    const menuItemPhoto = (req as any).uploadUrl;

    console.log(req.body);
    //Check for required fields 
    if(!(menuItemName))return next(createCustomError('Enter all mandatory fields.', 400));

    //Check if user exists
    // if(await carousel.findOne({isDeleted: false, email})) return next(createCustomError('User with this email already exists. Please login with existing email.', 401));
    const menuItem = await Carousel.create({menuItemName, type, category,price, kitchen, status,
      createdBy: (req as any).user._id, dishPhoto: menuItemPhoto});

    if(!menuItem) return next(createCustomError('Couldn\'t create menu item', 400));

    res.status(201).json({status: "success", data:menuItem});
    
});

export const getMenuItems = CatchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    let menuItems;
    if(req.query.kitchen){
        menuItems = await MenuItem.find({isDeleted: false, kitchen: req.query.kitchen}).populate('kitchen', 'kitchenName');
    }else{
        menuItems = await MenuItem.find({isDeleted: false}).populate('kitchen', 'kitchenName');
    }

    if(!menuItems) return next(createCustomError('No menuItems found.', 404));
    
    res.status(200).json({status:"success", data: menuItems, results: menuItems.length});

});
export const deleteMenuItem = CatchAsync(async (req:Request, res: Response, next:NextFunction) => {
    const {id} = req.params;

    const filter = { _id: id };
    const update = { isDeleted: true };

    try{
        const menuItem = await MenuItem.findByIdAndUpdate(id, update);
        res.status(200).json({message : "data deleted succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }    
    
});

export const getMenuItem = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const menuItem = await MenuItem.findOne({_id: id, isDeleted: false}).select('-__v');

    if(!menuItem) return next(createCustomError('No such menu item found.', 404));
    
    res.status(200).json({status:"success", data: menuItem});

});


export const editMenuItem = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const menuItem = await MenuItem.findOne({_id: id}).select('-__v ');

    if(!menuItem) return next(createCustomError('No such menuItem found.', 404));

    const filteredBody = filterObj(req.body, 'menuItemName', 'description', 'type', 'dishPhoto', 'availability', 'price');
    
    filteredBody.lastModifiedBy = id;
    console.log((req as any).uploadUrl);
    if ((req as any).file) filteredBody.dishPhoto = (req as any).uploadUrl;

    
    const updatedMenuItem = await Carousel.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
      }).select('-__v');
    res.status(200).json({status: "success", data:updatedMenuItem});

});

export const getActiveCarousels = CatchAsync(async (req: Request, res: Response, next: NextFunction)=>{
  let date = new Date();
  const carousels = await Carousel.find({isDeleted: false, startDate : {$gte : date}, endDate :{$lte : date}})
  .populate({path: 'kitchens', populate:{path:'society', model:'Society'}}).sort({endDate:-1});

  if(!carousels) return next(createCustomError('No users found.', 404));
  
  res.status(200).json({status:"success", data: carousels, results: carousels.length});

});
