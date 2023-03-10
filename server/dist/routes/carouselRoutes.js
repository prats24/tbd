"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const carouselController_1 = require("../controllers/carouselController");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const currentHomeChef = (req, res, next) => {
    req.params.id = req.user._id;
    next();
};
router.route('/').get(carouselController_1.getCarousels).post((0, authController_1.protect)(User_1.default), carouselController_1.uploadMulter, carouselController_1.resizePhoto, carouselController_1.uploadToS3, carouselController_1.createCarousel);
router.route('/:id').get((0, authController_1.protect)(User_1.default), carouselController_1.getCarousel).patch((0, authController_1.protect)(User_1.default), carouselController_1.uploadMulter, carouselController_1.resizePhoto, carouselController_1.uploadToS3, carouselController_1.editCarousel).delete((0, authController_1.protect)(User_1.default), carouselController_1.deleteCarousel);
exports.default = router;
