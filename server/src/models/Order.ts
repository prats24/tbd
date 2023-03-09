import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const orderSchema = new mongoose.Schema({
    orderedBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    orderStatus:{
        type: String,
        required: true
    },
    orderTime:{
        type: Date,
        default: new Date().toISOString().split('T').join(' ').split('.')[0],
    },
    orderSociety:{
        type: Schema.Types.ObjectId,
        ref: 'Society'
    },
    orderDeliverySlot: String,
    orderKitchen:{
        type: Schema.Types.ObjectId,
        ref: 'Kitchen',
    },
    discout:{
        type: Schema.Types.ObjectId,
        ref: 'Discount',
    },
    deliveryAgent:{
        type: Schema.Types.ObjectId,
        ref:'DeliveryAgent'
    },
    orderMenuItems:{
        type: [String]
    },
    orderItemAmount:{
        type: Number,
    },
    orderGstCharge:{
        type: Number
    },
    orderDeliveryCharge:{
        type: Number
    },
    orderPackagingCharge: Number,
    orderTotalAmount: Number,
    orderInstructions: String, 
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
    orderId: String,
});


orderSchema.pre('save', function (next) {
    
    (this.lastModifiedOn as any) = Date.now();
    next();
});

orderSchema.pre('findOneAndUpdate', function(next){
    this.set({lastModifiedOn: Date.now()});
    next();
});


//Adding the jk id before saving
orderSchema.pre('save', async function(next){
    if(!this.orderId|| this.isNew){
        const count = await order.countDocuments();
        const carouselId = "HRO" + (count + 1).toString().padStart(9, "0");
        this.orderId = carouselId;
        next();
    }
    next();
})




const order = mongoose.model("Order", orderSchema);
export default order;
