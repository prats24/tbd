"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const HomeChef_1 = __importDefault(require("../models/HomeChef"));
const router = express_1.default.Router();
const currentHomeChef = (req, res, next) => {
    req.params.id = req.user._id;
    next();
};
router.route('/').get(userController_1.getUsers).post(userController_1.createUser);
router.route('/login').post((0, authController_1.login)(HomeChef_1.default));
router.route('/signup').post((0, authController_1.signup)(HomeChef_1.default));
router.use((0, authController_1.protect)(HomeChef_1.default));
router.route('/me').get(currentHomeChef, userController_1.getUser).patch(currentHomeChef, userController_1.editUser).delete(currentHomeChef, userController_1.deleteUser);
router.route('/:id').get(userController_1.getUser).patch(userController_1.editUser).delete(userController_1.deleteUser);
exports.default = router;
