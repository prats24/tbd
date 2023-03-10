import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const cuisineSchema = new mongoose.Schema({
    cuisineName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    cuisineIcon: String,
    createdOn:{
        type: Date,
        default: Date.now(),
        required : true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    lastModifiedOn:{
        type: Date,
        // required : true
    },
    lastModifiedBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required : true
    },
    isDeleted:{
        type: Boolean,
        default: false,
        // required : true
    },
    cuisineId: String,
    status: {
        type: String,
        enum:['active', 'inactive'],
        default: 'inactive'
    }
});


cuisineSchema.pre('save', function (next) {
    
    (this.lastModifiedOn as any) = Date.now();
    next();
});

cuisineSchema.pre('findOneAndUpdate', function(next){
    this.set({lastModifiedOn: Date.now()});
    next();
});


//Adding the jk id before saving
cuisineSchema.pre('save', async function(next){
    if(!this.cuisineId|| this.isNew){
        const count = await cuisine.countDocuments();
        const cuisineId = "HRCU" + (count + 1).toString().padStart(8, "0");
        this.cuisineId = cuisineId;
        next();
    }
    next();
})




const cuisine = mongoose.model("Cuisine", cuisineSchema);
export default cuisine;
