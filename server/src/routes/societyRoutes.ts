import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {getSociety, editSociety, deleteSociety, createSociety, getSocieties, uploadMulter, uploadToS3, resizePhoto,} from '../controllers/societyController';
import User from '../models/User';

const router = express.Router();
router.use(protect());
router.route('/').get(getSocieties).post(uploadMulter, resizePhoto, uploadToS3, createSociety);
router.route('/:id').get(getSociety).patch(uploadMulter, resizePhoto, uploadToS3, editSociety).delete(deleteSociety);


export default router;