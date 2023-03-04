"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const societyController_1 = require("../controllers/societyController");
const router = express_1.default.Router();
router.use((0, authController_1.protect)());
router.route('/').get(societyController_1.getSocieties).post(societyController_1.uploadMulter, societyController_1.resizePhoto, societyController_1.uploadToS3, societyController_1.createSociety);
router.route('/:id').get(societyController_1.getSociety).patch(societyController_1.uploadMulter, societyController_1.resizePhoto, societyController_1.uploadToS3, societyController_1.editSociety).delete(societyController_1.deleteSociety);
exports.default = router;
