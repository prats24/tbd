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
exports.editHomeChef = exports.getHomeChef = exports.deleteHomeChef = exports.getHomeChefs = exports.createHomeChef = void 0;
const HomeChef_1 = __importDefault(require("../models/HomeChef"));
const customError_1 = require("../errors/customError");
const CatchAsync_1 = __importDefault(require("../middlewares/CatchAsync"));
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
exports.createHomeChef = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, gender, dateOfBirth, email, password, phone, city, address, society, bankDetails, description, } = req.body;
    console.log("User :", req.user);
    //Check for required fields 
    if (!(email || password || phone || firstName || lastName || gender))
        return next((0, customError_1.createCustomError)('Enter all mandatory fields.', 401));
    //Check if user exists
    if (yield HomeChef_1.default.findOne({ isDeleted: false, email }))
        return next((0, customError_1.createCustomError)('User with this email already exists. Please login with existing email.', 401));
    const homeChef = yield HomeChef_1.default.create({ firstName, lastName, gender, dateOfBirth, email, password, phone, city, society, address });
    if (!homeChef)
        return next((0, customError_1.createCustomError)('Couldn\'t create user', 400));
    res.status(201).json({ status: "success", data: homeChef });
}));
exports.getHomeChefs = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const homeChefs = yield HomeChef_1.default.find({ isDeleted: false });
    if (!homeChefs)
        return next((0, customError_1.createCustomError)('No users found.', 404));
    res.status(200).json({ status: "success", data: homeChefs, results: homeChefs.length });
}));
exports.deleteHomeChef = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const filter = { _id: id };
    const update = { $set: { isDeleted: true } };
    try {
        const userDetail = yield HomeChef_1.default.updateOne(filter, update);
        console.log("this is userdetail", userDetail);
        res.status(200).json({ massage: "data delete succesfully" });
    }
    catch (e) {
        res.status(500).json({ error: "Failed to delete data" });
    }
}));
exports.getHomeChef = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield HomeChef_1.default.findOne({ _id: id, isDeleted: false }).select('-__v -password')
        .populate({ path: "role", select: "roleName" });
    if (!user)
        return next((0, customError_1.createCustomError)('No such user found.', 404));
    res.status(200).json({ status: "success", data: user });
}));
exports.editHomeChef = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { firstName, lastName, gender, dateOfBirth, email, password, phone, city, state, address } = req.body;
    const user = yield HomeChef_1.default.findOne({ _id: id, isDeleted: false }).select('-__v -password -role');
    if (!user)
        return next((0, customError_1.createCustomError)('No such user found.', 404));
    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email', 'phone', 'profilePhoto', 'city', 'society', 'dateOfBirth', 'lastModifiedBy', 'address', 'gender');
    filteredBody.lastModifiedBy = id;
    if (req.file)
        filteredBody.profilePhoto = req.profilePhotoUrl;
    const updatedHomeChef = yield HomeChef_1.default.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
    }).select('-__v -password -role');
    res.status(200).json({ status: "success", data: updatedHomeChef });
}));
