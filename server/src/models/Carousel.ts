import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const carouselSchema = new mongoose.Schema({
    carouselName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    startDate: Date,
    carouselPhoto: String,
    endDate:Date,
    kitchens:[{
        type: Schema.Types.ObjectId,
        ref: 'Kitchen'
    }],
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
    carouselId: String,
});


carouselSchema.pre('save', function (next) {
    
    (this.lastModifiedOn as any) = Date.now();
    next();
});

carouselSchema.pre('findOneAndUpdate', function(next){
    this.set({lastModifiedOn: Date.now()});
    next();
});


//Adding the jk id before saving
carouselSchema.pre('save', async function(next){
    if(!this.carouselId|| this.isNew){
        const count = await carousel.countDocuments();
        const carouselId = "HRCL" + (count + 1).toString().padStart(8, "0");
        this.carouselId = carouselId;
        next();
    }
    next();
})




const carousel = mongoose.model("Carousel", carouselSchema);
export default carousel;
