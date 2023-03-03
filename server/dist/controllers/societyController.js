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
exports.editSociety = exports.getSociety = exports.deleteSociety = exports.getSocieties = exports.createSociety = exports.uploadToS3 = exports.resizePhoto = exports.uploadMulter = void 0;
const Society_1 = __importDefault(require("../models/Society"));
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
const upload = (0, multer_1.default)({ storage, fileFilter }).single("photo");
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
    (0, sharp_1.default)(req.file.buffer).resize({ width: 400, height: 400 }).toBuffer()
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
    let societyName;
    if (req.body.societyName && req.body.societyPinCode) {
        societyName = req.body.societyName + req.body.societyPinCode;
    }
    else {
        let society = yield Society_1.default.findById(req.params.id);
        societyName = `${society === null || society === void 0 ? void 0 : society.societyName}` + `${society === null || society === void 0 ? void 0 : society.societyPinCode}`;
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
    s3.upload(params).promise()
        .then((s3Data) => {
        console.log('file uploaded');
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
exports.createSociety = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { societyName, societyGeoLocation, societyTowers, societyPinCode, societyAddress, societyType } = req.body;
    const societyPhoto = req.uploadUrl;
    //Check for required fields 
    console.log(req.body);
    if (!(societyName || societyPinCode))
        return next((0, customError_1.createCustomError)('Enter all mandatory fields.', 401));
    //Check if user exists
    if (yield Society_1.default.findOne({ isDeleted: false, societyName, societyPinCode }))
        return next((0, customError_1.createCustomError)('Society with this email already exists. Please edit the existing society.', 401));
    const society = yield Society_1.default.create({ societyName, societyPinCode, societyGeoLocation, createdBy: req.user._id,
        societyTowers, societyAddress, societyPhoto });
    if (!society)
        return next((0, customError_1.createCustomError)('Couldn\'t create user', 400));
    res.status(201).json({ status: "success", data: society });
}));
exports.getSocieties = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('here');
    const societies = yield Society_1.default.find({ isDeleted: false });
    if (!societies)
        return next((0, customError_1.createCustomError)('No societies found.', 404));
    res.status(200).json({ status: "success", data: societies, results: societies.length });
}));
exports.deleteSociety = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const filter = { _id: id };
    const update = { $set: { isDeleted: true } };
    try {
        const society = yield Society_1.default.updateOne(filter, update);
        res.status(200).json({ message: "Society deleted succesfully" });
    }
    catch (e) {
        res.status(401).json({ error: "Failed to delete data" });
    }
}));
exports.getSociety = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const society = yield Society_1.default.findOne({ _id: id, isDeleted: false }).select('-__v');
    if (!society)
        return next((0, customError_1.createCustomError)('No such society found.', 404));
    res.status(200).json({ status: "success", data: society });
}));
exports.editSociety = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { societyName, societyGeoLocation, societyTowers, societyPinCode, societyAddress, societyType } = req.body;
    const society = yield Society_1.default.findOne({ _id: id, isDeleted: false }).select('-__v');
    if (!society)
        return next((0, customError_1.createCustomError)('No such user found.', 404));
    const filteredBody = filterObj(req.body, 'societyName', 'societyGeoLocation', 'societyTowers', 'societyTowers', 'societyPinCode', 'societyAddress', 'societyType');
    filteredBody.lastModifiedBy = id;
    if (req.file)
        filteredBody.societyPhoto = req.uploadUrl;
    const updatedSociety = yield Society_1.default.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
    }).select('-__v');
    res.status(200).json({ status: "success", data: updatedSociety });
}));
