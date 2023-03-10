import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const kitchenSchema = new mongoose.Schema({
    kitchenName: String,
    homeChef:{
        type: Schema.Types.ObjectId,
        ref: 'HomeChef',
        // required: true,
    },
    kitchenType:String,
    phone: String,
    email: String,
    society: {
        type: Schema.Types.ObjectId,
        ref: 'Society'
    },
    flatNo: String,
    floor: String,
    tower: String,
    foodPreference: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    cart:[],
    payouts:[{type: Schema.Types.ObjectId, ref: 'Payment'}],
    reviews:[{type: Schema.Types.ObjectId, ref: 'Review'}],
    customers: [{type: Schema.Types.ObjectId, ref: 'Kitchen'}],
    cuisines:[{type: Schema.Types.ObjectId, ref: 'Cuisine'}],
    description: String,
    displayPhoto: String,
    coverPhoto: String,
    foodLicenseNumber: String,
    foodLicensePhoto: String,
    platformRating:[
        {rating: Number, createdOn: Date}
    ],
    customerRating:[{
        rating: Number,
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        description: String,
        createdOn: Date,
    }],
    discounts:[{type: Schema.Types.ObjectId, ref: 'Discount'}],
    foodMenu:[{type: Schema.Types.ObjectId, ref: 'FoodMenu'}],
    gstApplicable: Boolean,
    deliveryChargeType:{
        type: String,
        enum:['Flat', 'Percentage'],
    },
    deliveryCharges: Number,
    costForOne: Number, 
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
    liveDate:{
        type: Date,
    },
    lastModifiedBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false, 
    },
    kitchenId: String,
    status: {
        type: String,
        enum:['active', 'inactive'],
        default: 'inactive'
    }
});


kitchenSchema.pre('save', function (next) {
    
    (this.lastModifiedOn as any) = Date.now();
    next();
});

kitchenSchema.pre('findOneAndUpdate', function(next){
    this.set({lastModifiedOn: Date.now()});
    next();
});


//Adding the jk id before saving
kitchenSchema.pre('save', async function(next){
    if(!this.kitchenId|| this.isNew){
        const count = await kitchen.countDocuments();
        const kitchenId = "HRK" + (count + 1).toString().padStart(8, "0");
        this.kitchenId = kitchenId;
        next();
    }
    next();
})  


const kitchen = mongoose.model("Kitchen", kitchenSchema);
export default kitchen;