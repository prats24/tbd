"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const currentUser = (req, res, next) => {
    req.params.id = req.user._id;
    next();
};
router.route('/').get(userController_1.getUsers).post(userController_1.createUser);
router.route('/login').post(authController_1.login);
router.route('/signup').post(authController_1.signup);
router.use(authController_1.protect);
router.route('/me').get(currentUser, userController_1.getUser).patch(currentUser, userController_1.editUser).delete(currentUser, userController_1.deleteUser);
router.route('/:id').get(userController_1.getUser).patch(userController_1.editUser).delete(userController_1.deleteUser);
exports.default = router;
