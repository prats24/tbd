import express, {Router, Request, Response, NextFunction} from 'express';
import { login, signup, protect} from '../controllers/authController';
import {getSociety, editSociety, deleteSociety, createSociety, getSocieties} from '../controllers/societyController';
import User from '../models/User';

const router = express.Router();
router.use(protect(User));
router.route('/').get(getSocieties).post(createSociety);
router.route('/:id').get(getSociety).patch(editSociety).delete(deleteSociety);


export default router;