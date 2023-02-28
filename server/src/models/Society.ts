import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const societySchema = new mongoose.Schema({
    societyName:{
        type: String,
        required: true,
    },
    societyGeoLocation:{
        type: "Point",
        coordinates:[Number, Number]
    },
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
    }
});


const Society = mongoose.model("Society", societySchema);
export default Society;
