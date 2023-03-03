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
exports.editKitchen = exports.getKitchen = exports.deleteKitchen = exports.getKitchens = exports.createKitchen = void 0;
const Kitchen_1 = __importDefault(require("../models/Kitchen"));
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
exports.createKitchen = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { kitchenName, kitchenType, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable, deliveryChargeType, deliveryCharge, costForTwo, email, phone, city, address, society, description, homeChef, kitchenPinCode } = req.body;
    //Check for required fields 
    if (!(kitchenName || phone || homeChef || society))
        return next((0, customError_1.createCustomError)('Enter all mandatory fields.', 400));
    //Check if user exists
    if (yield Kitchen_1.default.findOne({ isDeleted: false, email, society }))
        return next((0, customError_1.createCustomError)('User with this email already exists. Please login with existing email.', 401));
    const kitchen = yield Kitchen_1.default.create({ kitchenName, kitchenType, kitchenCuisine, foodLicenseNumber, discount, foodMenu, gstApplicable,
        deliveryChargeType, deliveryCharge, costForTwo, email, phone, city, address, society,
        description, homeChef, kitchenPinCode });
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
    const filteredBody = filterObj(req.body, 'kitchenName', 'email', 'phone', 'city', 'society', 'lastModifiedBy', 'address', 'kitchenType', 'kitchenCuisine', 'description', 'foodlicenseNumber', 'discounts', 'foodMenu', 'gstApplicable', 'deliveryChargeType', 'deliveryCharge', 'costForTwo');
    filteredBody.lastModifiedBy = id;
    const updatedKitchen = yield Kitchen_1.default.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true
    }).select('-__v');
    res.status(200).json({ status: "success", data: updatedKitchen });
}));
