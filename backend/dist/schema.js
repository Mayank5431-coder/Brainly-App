"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const contentSchema = new mongoose_2.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tags: [{
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Tag',
        }],
    userId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
exports.Content = mongoose_1.default.model("Content", contentSchema);
exports.User = mongoose_1.default.model("User", UserSchema);
