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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Society'
    },
    address: String,
    city: String,
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
    payments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Payment' }],
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Review' }],
    favorites: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Kitchen' }],
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
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role'
    },
    passwordChangedAt: Date,
    appID: String,
});
userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, userPassword);
    });
};
//check if password has changed after issuing the token 
userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(String(this.passwordChangedAt.getTime() / 1000), 10);
        return jwtTimeStamp < changedTimeStamp;
    }
    return false;
};
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        this.lastModifiedOn = Date.now();
        return next();
    }
    ;
    this.lastModifiedOn = Date.now();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
userSchema.pre('findOneAndUpdate', function (next) {
    this.set({ lastModifiedOn: Date.now() });
    next();
});
//Hashing user password  
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        next();
    });
});
//Adding the jk id before saving
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.appID || this.isNew) {
            const count = yield user.countDocuments();
            const userId = "TBD" + (count + 1).toString().padStart(8, "0");
            this.appID = userId;
            next();
        }
        next();
    });
});
const user = mongoose_1.default.model("User", userSchema);
exports.default = user;
