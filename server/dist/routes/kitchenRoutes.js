"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const kitchenController_1 = require("../controllers/kitchenController");
const HomeChef_1 = __importDefault(require("../models/HomeChef"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const currentKitchen = (req, res, next) => {
    req.params.id = req.user._id;
    next();
};
router.route('/').get(kitchenController_1.getKitchens).post((0, authController_1.protect)(User_1.default), kitchenController_1.uploadMulterMultiple, kitchenController_1.resizePhoto, kitchenController_1.uploadToS3, kitchenController_1.createKitchen);
router.route('/mykitchen/:id').get((0, authController_1.protect)(HomeChef_1.default), kitchenController_1.getKitchen).patch((0, authController_1.protect)(HomeChef_1.default), kitchenController_1.editKitchen).delete((0, authController_1.protect)(HomeChef_1.default), kitchenController_1.deleteKitchen);
router.route('/:id').get((0, authController_1.protect)(User_1.default), kitchenController_1.getKitchen).patch((0, authController_1.protect)(User_1.default), kitchenController_1.uploadMulterMultiple, kitchenController_1.resizePhoto, kitchenController_1.uploadToS3, kitchenController_1.editKitchen).delete((0, authController_1.protect)(User_1.default), kitchenController_1.deleteKitchen);
exports.default = router;
