import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import {createCustomError} from '../errors/customError';
import {promisifiedVerify, signToken} from '../utils/authUtil';
import CatchAsync from '../middlewares/CatchAsync';
import crypto from 'crypto';
import mongoose from 'mongoose';


interface UserCred{
    email?: string,
    password?: string,
    mobile?: string,
    firstName?: string,
    lastName?: string, 
    profilePhoto?: string,
};

export const protect = (Model:any = User) =>{return async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    console.log('checking');
    let token: string;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    // console.log((req ))
    if (req.cookies) {
        if(req.cookies.jwt) token = req.cookies.jwt;
        console.log(req.cookies.jwt);
    }

    if (!token!) return next(createCustomError('You are not logged in. Please log in to continue.',401));
    
    const decoded = await promisifiedVerify(token, process.env.JWT_SECRET!);

    // console.log(decoded);

    const freshUser = await Model.findById(decoded._id);

    if(!freshUser){
        return next(createCustomError('User no longer exixts.', 401));
    }

    if((freshUser as any).changedPasswordAfter(decoded.iat)){
        return next(createCustomError('Password was changed. Log in again.', 401));
    }
    (req as any).user = freshUser;
    (req as any).token = token;
    next();
    };
}


export const login = (Model:any = User)=>{return CatchAsync(async (req: Request, res:Response, next: NextFunction) =>{
    const {email, password}: UserCred = req.body;
    if (!email)
        return next(createCustomError('Username or email needed', 401));
    if (!password) return next(createCustomError('Password is needed', 401));
  
    const user = await Model.findOne({
        email: email
    });

    if (!user || !(await (user as any).correctPassword(password, user.password))) {
        return next(
        createCustomError('Incorrect email or password', 401)
        );
    }
    const token = signToken(String(user._id));

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN!)* 24 * 60 * 60 * 1000),
        // secure: process.env.NODE_ENV === 'production',
        // httpOnly: true,
    });
    res.status(200).json({
        status: 'success',
        token,
        data: user,
    });
    
 });
}

export const signup = (Model:any = User)=>{return CatchAsync(async (req: Request, res:Response, next: NextFunction) =>{

    const {email, password, mobile, firstName, lastName }: UserCred = req.body;

    const newUser = await Model.create({
        email,
        password,
        firstName,
        lastName
    });

    const token = signToken(String(newUser._id));
    res.status(200).json({
        status: 'success',
        token,
        data: {
        user: newUser,
        },
    });
        
  });
}