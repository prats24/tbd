"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editKitchen = exports.getKitchen = exports.deleteKitchen = exports.getKitchens = exports.createKitchen = exports.uploadToS3 = exports.resizePhoto = exports.uploadMulterMultiple = exports.uploadMulter = void 0;
const Kitchen_1 = __importDefault(require("../models/Kitchen"));
const customError_1 = require("../errors/customError");
const CatchAsync_1 = __importDefault(require("../middlewares/CatchAsync"));
const sharp_1 = __importDefault(require("sharp"));
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type"), false);
    }
};
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
//     // accessKeyId: "AKIASR77BQMICZATCLPV",
//     // secretAccessKey: "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",
//   });
const upload = (0, multer_1.default)({ storage, fileFilter }).single("displayPhoto");
const uploadMultiple = (0, multer_1.default)({ storage, fileFilter }).fields([{ name: 'displayPhoto', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 }]);
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);
exports.uploadMulter = upload;
exports.uploadMulterMultiple = uploadMultiple;
const resizePhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('resize func');
    if (!req.files) {
        // no file uploaded, skip to next middleware
        console.log('no file');
        next();
        return;
    }
    const { displayPhoto, coverPhoto } = (req.files);
    if (displayPhoto && displayPhoto[0].buffer) {
        const resizedDisplayPhoto = yield (0, sharp_1.default)(displayPhoto[0].buffer)
            .resize({ width: 500, height: 500 })
            .toBuffer();
        req.files.displayPhotoBuffer = resizedDisplayPhoto;
    }
    if (coverPhoto && coverPhoto[0].buffer) {
        const resizedCoverPhoto = yield (0, sharp_1.default)(coverPhoto[0].buffer)
            .resize({ width: 1000, height: 500 })
            .toBuffer();
        req.files.coverPhotoBuffer = resizedCoverPhoto;
    }
    next();
});
exports.resizePhoto = resizePhoto;
const uploadToS3 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        // no file uploaded, skip to next middleware
        console.log('no files bro');
        next();
        return;
    }
    try {
        if (req.files.displayPhoto) {
            let kitchenName;
            if (req.body.kitchenName) {
                kitchenName = req.body.kitchenName;
            }
            else {
                const kitchen = yield Kitchen_1.default.findById(req.params.id);
                kitchenName = `${kitchen === null || kitchen === void 0 ? void 0 : kitchen.kitchenName}`;
            }
            const key = `homechefs/${kitchenName}/photos/display/${Date.now() + req.files.displayPhoto[0].originalname}`;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: req.files.displayPhotoBuffer,
                ContentType: req.files.displayPhoto.mimetype,
                ACL: 'public-read',
            };
            // upload image to S3 bucket
            const s3Data = yield s3.upload(params).promise();
            console.log('file uploaded');
            console.log(s3Data.Location);
            req.displayPhotoUrl = s3Data.Location;
            console.log('calling next after upload');
            console.log('next called');
        }
        if (req.files.coverPhoto) {
            let kitchenName;
            if (req.body.kitchenName) {
                kitchenName = req.body.kitchenName;
            }
            else {
                const kitchen = yield Kitchen_1.default.findById(req.params.id);
                kitchenName = `${kitchen === null || kitchen === void 0 ? void 0 : kitchen.kitchenName}`;
            }
            const key = `homechefs/${kitchenName}/photos/cover/${Date.now() + req.files.coverPhoto[0].originalname}`;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: req.files.coverPhotoBuffer,
                ContentType: req.files.coverPhoto.mimetype,
                ACL: 'public-read',
            };
            // upload image to S3 bucket
            const s3Data = yield s3.upload(params).promise();
            console.log('file uploaded');
            console.log(s3Data.Location);
            req.coverPhotoUrl = s3Data.Location;
        }
        console.log('calling next of s3 upload func');
        next();
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error uploading to S3' });
    }
});
exports.uploadToS3 = uploadToS3;
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el) &&
            (obj[el] !== null &&
                obj[el] !== undefined &&
                obj[el] !== '')) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
};
exports.createKitchen = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('createKitchen', req.body);
    let coverPhoto, displayPhoto;
    if (req.files) {
        if (req.displayPhotoUrl)
            displayPhoto = req.displayPhotoUrl;
        if (req.coverPhotoUrl)
            coverPhoto = req.coverPhotoUrl;
    }
    console.log(displayPhoto);
    console.log(coverPhoto);
    // const{kitchenName, kitchenType, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable, 
    //     deliveryChargeType, deliveryCharge, costForTwo, email, phone, city, address, society, 
    //     description, homeChef, kitchenPinCode} = req.body;
    const { kitchenName, kitchenType, liveDate, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable, deliveryChargeType, deliveryCharges, costForOne, email, phone, flatNo, floor, tower, society, description, status, homeChef } = req.body;
    //Check for required fields 
    if (!(kitchenName || phone || homeChef || society))
        return next((0, customError_1.createCustomError)('Enter all mandatory fields.', 400));
    //Check if user exists
    // if(await Kitchen.findOne({isDeleted: false, email, society})) return next(createCustomError('User with this email already exists.', 401));
    // const kitchen = await Kitchen.create({kitchenName, kitchenType, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable, 
    //     deliveryChargeType, deliveryCharge, costForTwo, email, phone, city, address, society, 
    //     description, homeChef, kitchenPinCode, displayPhoto, coverPhoto});
    if (yield Kitchen_1.default.findOne({ isDeleted: false, email, society }))
        return next((0, customError_1.createCustomError)('Kitchen with this email already exists.', 401));
    const kitchen = yield Kitchen_1.default.create({ kitchenName, kitchenType, liveDate, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable,
        deliveryChargeType, deliveryCharges, costForOne, email, phone, flatNo, floor, tower, society,
        description, status, homeChef, displayPhoto, coverPhoto });
    if (!kitchen)
        return next((0, customError_1.createCustomError)('Couldn\'t create kithcen', 400));
    res.status(201).json({ status: "success", data: kitchen });
}));
exports.getKitchens = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const kitchens = yield Kitchen_1.default.find({ isDeleted: false });
    if (!kitchens)
        return next((0, customError_1.createCustomError)('No users found.', 404));
    res.status(200).json({ status: "success", data: kitchens, results: kitchens.length });
}));
exports.deleteKitchen = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const filter = { _id: id };
    const update = { $set: { isDeleted: true } };
    try {
        const kitchen = yield Kitchen_1.default.updateOne(filter, update);
        // console.log("this is kitchen", kitchen);
        res.status(200).json({ message: "kitchen deleted succesfully" });
    }
    catch (e) {
        res.status(500).json({ error: "Failed to delete kitchen" });
    }
}));
exports.getKitchen = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const kitchen = yield Kitchen_1.default.findOne({ _id: id, isDeleted: false }).select('-__v');
    if (!kitchen)
        return next((0, customError_1.createCustomError)('No such user found.', 404));
    res.status(200).json({ status: "success", data: kitchen });
}));
exports.editKitchen = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield Kitchen_1.default.findOne({ _id: id }).select('-__v');
    if (!user)
        return next((0, customError_1.createCustomError)('No such user found.', 404));
    const filteredBody = filterObj(req.body, 'kitchenName', 'kitchenType', 'liveDate', 'kitchenCuisine', 'foodLicenseNumber', 'discount', 'foodMenu', 'gstApplicable', 'deliveryChargeType', 'deliveryCharges', 'costForOne', 'email', 'phone', 'flatNo', 'floor', 'tower', 'society', 'description', 'status', 'homeChef');
    filteredBody.lastModifiedBy = id;
    if (req.displayPhotoUrl)
        filteredBody.displayPhoto = req.displayPhotoUrl;
    if (req.coverPhotoUrl)
        filteredBody.coverPhoto = req.coverPhotoUrl;
    const updatedKitchen = yield Kitchen_1.default.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
    }).select('-__v');
    res.status(200).json({ status: "success", data: updatedKitchen });
}));
