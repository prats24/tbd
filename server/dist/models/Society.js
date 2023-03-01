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
const societySchema = new mongoose_1.default.Schema({
    societyName: {
        type: String,
        required: true,
    },
    societyGeoLocation: {
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
    societyAddress: {
        type: String,
    },
    societyPinCode: {
        type: String
    },
    societyType: {
        type: String
    },
    societyTowers: {
        type: Number
    },
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
        default: false
    },
    societyId: {
        type: String,
    },
});
societySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.societyId || this.isNew) {
            const count = yield Society.countDocuments();
            const sId = "HRS" + (count + 1).toString().padStart(8, "0");
            this.societyId = sId;
            next();
        }
        next();
    });
});
societySchema.pre('save', function (next) {
    this.lastModifiedOn = Date.now();
    next();
});
societySchema.pre('findOneAndUpdate', function (next) {
    this.set({ lastModifiedOn: Date.now() });
    next();
});
const Society = mongoose_1.default.model("Society", societySchema);
exports.default = Society;
