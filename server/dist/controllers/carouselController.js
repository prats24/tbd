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
exports.editCarousel = exports.getCarousel = exports.deleteCarousel = exports.getCarousels = exports.createCarousel = exports.uploadToS3 = exports.resizePhoto = exports.uploadMulter = void 0;
const Carousel_1 = __importDefault(require("../models/Carousel"));
const customError_1 = require("../errors/customError");
const CatchAsync_1 = __importDefault(require("../middlewares/CatchAsync"));
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const sharp_1 = __importDefault(require("sharp"));
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
const upload = (0, multer_1.default)({ storage, fileFilter }).single("carouselPhoto");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);
exports.uploadMulter = upload;
const resizePhoto = (req, res, next) => {
    if (!req.file) {
        // no file uploaded, skip to next middleware
        console.log('no file');
        next();
        return;
    }
    (0, sharp_1.default)(req.file.buffer).resize({ width: 600 }).toBuffer()
        .then((resizedImageBuffer) => {
        req.file.buffer = resizedImageBuffer;
        next();
    })
        .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error resizing photo" });
    });
};
exports.resizePhoto = resizePhoto;
const uploadToS3 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        // no file uploaded, skip to next middleware
        next();
        return;
    }
    // create S3 upload parameters
    let carouselName;
    if (req.body.carouselName) {
        carouselName = req.body.carouselName;
    }
    else {
        let carousel = yield Carousel_1.default.findById(req.params.id);
        carouselName = `${carousel === null || carousel === void 0 ? void 0 : carousel.carouselName}`;
    }
    const key = `carousels/${carouselName}/photos/${(Date.now()) + req.file.originalname}`;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read',
    };
    // upload image to S3 bucket
    s3.upload(params).promise()
        .then((s3Data) => {
        console.log('file uploaded');
        console.log(s3Data.Location);
        req.uploadUrl = s3Data.Location;
        next();
    })
        .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error uploading to S3" });
    });
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
exports.createCarousel = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { carouselName, description, startDate, endDate, kitchens } = req.body;
    const carouselPhoto = req.uploadUrl;
    //Check for required fields 
    if (!(carouselName))
        return next((0, customError_1.createCustomError)('Enter all mandatory fields.', 400));
    //Check if user exists
    // if(await carousel.findOne({isDeleted: false, email})) return next(createCustomError('User with this email already exists. Please login with existing email.', 401));
    const carousel = yield Carousel_1.default.create({ carouselName, description, startDate, endDate, kitchens,
        createdBy: req.user._id, carouselPhoto });
    if (!carousel)
        return next((0, customError_1.createCustomError)('Couldn\'t create carousel', 400));
    res.status(201).json({ status: "success", data: carousel });
}));
exports.getCarousels = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const carousels = yield Carousel_1.default.find({ isDeleted: false });
    if (!carousels)
        return next((0, customError_1.createCustomError)('No users found.', 404));
    res.status(200).json({ status: "success", data: carousels, results: carousels.length });
}));
exports.deleteCarousel = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const filter = { _id: id };
    const update = { isDeleted: true };
    try {
        const userDetail = yield Carousel_1.default.findByIdAndUpdate(id, update);
        console.log("this is userdetail", userDetail);
        res.status(200).json({ massage: "data delete succesfully" });
    }
    catch (e) {
        res.status(500).json({ error: "Failed to delete data" });
    }
}));
exports.getCarousel = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield Carousel_1.default.findOne({ _id: id, isDeleted: false }).select('-__v -password');
    if (!user)
        return next((0, customError_1.createCustomError)('No such carousel found.', 404));
    res.status(200).json({ status: "success", data: user });
}));
exports.editCarousel = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const carousel = yield Carousel_1.default.findOne({ _id: id }).select('-__v -password -role');
    if (!carousel)
        return next((0, customError_1.createCustomError)('No such carousel found.', 404));
    const filteredBody = filterObj(req.body, 'carouselName', 'description', 'endDate', 'startDate', 'lastModifiedBy');
    filteredBody.lastModifiedBy = id;
    console.log(req.puploadUrl);
    if (req.file)
        filteredBody.carouselPhoto = req.uploadUrl;
    const updatedCarousel = yield Carousel_1.default.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
    }).select('-__v -password -role');
    res.status(200).json({ status: "success", data: updatedCarousel });
}));
