"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const kitchenSchema = new mongoose_1.default.Schema({
    kitchenName: String,
    homeChef: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'HomeChef',
        required: true,
    },
    kitchenType: String,
    phone: String,
    email: String,
    society: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Society'
    },
    address: String,
    city: String,
    kitchenPinCode: String,
    geoLocation: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            //   required: true
        },
        coordinates: {
            type: [Number],
            //   required: true
        }
    },
    foodPreference: String,
    orders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' }],
    cart: [],
    payouts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Payment' }],
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Review' }],
    customers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Kitchen' }],
    kitchenCuisine: [String],
    description: String,
    displayPhoto: String,
    coverPhoto: String,
    foodLicenseNumber: String,
    foodLicensePhoto: String,
    platformRating: [
        { rating: Number, createdOn: Date }
    ],
    customerRating: [{
            rating: Number,
            customer: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            },
            description: String,
            createdOn: Date,
        }],
    discounts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Discount' }],
    foodMenu: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'FoodMenu' }],
    gstApplicable: Boolean,
    deliveryChargeType: {
        type: String,
        enum: ['flat', 'percentage'],
    },
    deliveryCharge: String,
    costForTwo: Number,
    createdOn: {
        type: Date,
        default: new Date().toISOString().split('T').join(' ').split('.')[0],
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastModifiedOn: {
        type: Date,
    },
    lastModifiedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    kitchenId: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
});
kitchenSchema.pre('save', function (next) {
    this.lastModifiedOn = Date.now();
    next();
});
kitchenSchema.pre('findOneAndUpdate', function (next) {
    this.set({ lastModifiedOn: Date.now() });
    next();
});
//Adding the jk id before saving
kitchenSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.kitchenId || this.isNew) {
            const count = yield kitchen.countDocuments();
            const kitchenId = "HRK" + (count + 1).toString().padStart(8, "0");
            this.kitchenId = kitchenId;
            next();
        }
        next();
    });
});
const kitchen = mongoose_1.default.model("HomeChef", kitchenSchema);
exports.default = kitchen;
