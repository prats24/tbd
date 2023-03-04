"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const homeChefController_1 = require("../controllers/homeChefController");
const HomeChef_1 = __importDefault(require("../models/HomeChef"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const currentHomeChef = (req, res, next) => {
    req.params.id = req.user._id;
    next();
};
router.route('/').get(homeChefController_1.getHomeChefs).post((0, authController_1.protect)(User_1.default), homeChefController_1.uploadMulter, homeChefController_1.resizePhoto, homeChefController_1.uploadToS3, homeChefController_1.createHomeChef);
router.route('/login').post((0, authController_1.login)(HomeChef_1.default));
router.route('/signup').post((0, authController_1.signup)(HomeChef_1.default));
router.route('/me').get((0, authController_1.protect)(HomeChef_1.default), currentHomeChef, homeChefController_1.getHomeChef).patch((0, authController_1.protect)(HomeChef_1.default), currentHomeChef, homeChefController_1.editHomeChef)
    .delete((0, authController_1.protect)(HomeChef_1.default), currentHomeChef, homeChefController_1.deleteHomeChef);
router.route('/:id').get((0, authController_1.protect)(User_1.default), homeChefController_1.getHomeChef).patch((0, authController_1.protect)(User_1.default), homeChefController_1.uploadMulter, homeChefController_1.resizePhoto, homeChefController_1.uploadToS3, homeChefController_1.editHomeChef).delete((0, authController_1.protect)(User_1.default), homeChefController_1.deleteHomeChef);
exports.default = router;
