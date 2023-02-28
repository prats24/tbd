import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true,
    },
    phone: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    society: {
        type: Schema.Types.ObjectId,
        ref: 'Society'
    },
    address: String,
    city: String,
    geoLocation:{
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        //   required: true
        },
        coordinates: {
          type: [Number],
        //   required: true
        }
      },
    foodPreference: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    cart:[],
    payments:[{type: Schema.Types.ObjectId, ref: 'Payment'}],
    reviews:[{type: Schema.Types.ObjectId, ref: 'Review'}],
    favorites: [{type: Schema.Types.ObjectId, ref: 'Kitchen'}],
    createdOn:{
        type: Date,
        default: new Date().toISOString().split('T').join(' ').split('.')[0],
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastModifiedOn:{
        type: Date,
    },
    lastModifiedBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    role:{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    passwordChangedAt: Date,
    appID: String,
});

userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
  ):Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

 //check if password has changed after issuing the token 
userSchema.methods.changedPasswordAfter = function (jwtTimeStamp: number) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        String(this.passwordChangedAt.getTime()/1000),
        10
      );
      return jwtTimeStamp < changedTimeStamp;
    }
    return false;
  };

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        (this.lastModifiedOn as any) = Date.now();
        return next();
    };
    (this.lastModifiedOn as any) = Date.now();
    (this.passwordChangedAt as any) = Date.now() - 1000;
    next();
});

userSchema.pre('findOneAndUpdate', function(next){
    this.set({lastModifiedOn: Date.now()});
    next();
});

//Hashing user password  
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password!, 12);
  
    next();
});

//Adding the jk id before saving
userSchema.pre('save', async function(next){
    if(!this.appID|| this.isNew){
        const count = await user.countDocuments();
        const userId = "TBD" + (count + 1).toString().padStart(8, "0");
        this.appID = userId;
        next();
    }
    next();
})  


const user = mongoose.model("User", userSchema);
export default user;