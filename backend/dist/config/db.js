"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const store_js_1 = require("../data/store.js");
const connectDB = async () => {
    store_js_1.LocalStore.initializeDemoData();
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/comiccraft';
    try {
        await mongoose_1.default.connect(uri, {
            serverSelectionTimeoutMS: 2500,
        });
        console.log('⚡ [Database] MongoDB Connected Successfully');
    }
    catch (error) {
        console.log('ℹ️ [Database] MongoDB connection bypassed. Using high-performance Local Store engine.');
    }
};
exports.connectDB = connectDB;
