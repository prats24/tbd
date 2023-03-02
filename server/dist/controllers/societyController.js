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
exports.editSociety = exports.getSociety = exports.deleteSociety = exports.getSocieties = exports.createSociety = void 0;
const Society_1 = __importDefault(require("../models/Society"));
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
exports.createSociety = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { societyName, societyGeoLocation, societyTowers, societyPinCode, societyAddress, societyType } = req.body;
    //Check for required fields 
    if (!(societyName || societyPinCode))
        return next((0, customError_1.createCustomError)('Enter all mandatory fields.', 401));
    //Check if user exists
    if (yield Society_1.default.findOne({ isDeleted: false, societyName, societyPinCode }))
        return next((0, customError_1.createCustomError)('Society with this email already exists. Please edit the existing society.', 401));
    const society = yield Society_1.default.create({ societyName, societyPinCode, societyGeoLocation, createdBy: req.user._id,
        societyTowers, societyAddress });
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
    const updatedSociety = yield Society_1.default.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
    }).select('-__v');
    res.status(200).json({ status: "success", data: updatedSociety });
}));
