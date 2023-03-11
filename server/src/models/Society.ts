import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const societySchema = new mongoose.Schema({
    societyName:{
        type: String,
        required: true,
    },
    societyGeoLocation:{
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
    societyPhoto: String,  
    societyAddress:{
        type: String,
    },
    societyPinCode:{
        type: String
    },
    societyType:{
        type: String
    },
    societyTowers:{
        type: Number
    },
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
    isDeleted:{
        type: Boolean,
        default: false
    },
    societyId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active','inactive'],
    },
});

societySchema.pre('save', async function(next){
    if(!this.societyId|| this.isNew){
        const count = await Society.countDocuments();
        const sId = "HRS" + (count + 1).toString().padStart(8, "0");
        this.societyId = sId;
        next();
    }
    next();
});

societySchema.pre('save', function (next) {
    (this.lastModifiedOn as any) = Date.now();
    next();
});

societySchema.pre('findOneAndUpdate', function(next){
    this.set({lastModifiedOn: Date.now()});
    next();
});

const Society = mongoose.model("Society", societySchema);
export default Society;
