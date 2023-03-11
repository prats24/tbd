import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const menuItemSchema = new mongoose.Schema({
    menuItemName:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum:['veg', 'non-veg'],
        required: true
    },
    category:{
        type: String,
    },
    price: {
        type: Number
    },
    dishPhoto: String,
    kitchen:{
        type: Schema.Types.ObjectId,
        ref: 'Kitchen'
    },
    availability:{
        type: Boolean,
    },
    description: String,
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
    menuItemId: String,
});


menuItemSchema.pre('save', function (next) {
    
    (this.lastModifiedOn as any) = Date.now();
    next();
});

menuItemSchema.pre('findOneAndUpdate', function(next){
    this.set({lastModifiedOn: Date.now()});
    next();
});


//Adding the jk id before saving
menuItemSchema.pre('save', async function(next){
    if(!this.menuItemId|| this.isNew){
        const count = await menuItem.countDocuments();
        const menuItemCode = "HRCL" + (count + 1).toString().padStart(8, "0");
        this.menuItemId = menuItemCode;
        next();
    }
    next();
})




const menuItem = mongoose.model("MenuItem", menuItemSchema);
export default menuItem;
