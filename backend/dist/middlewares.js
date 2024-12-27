"use strict";
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
exports.ContentMid = exports.SigninMid = exports.SignupMid = void 0;
const schema_1 = require("./schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const config_1 = require("./config");
const pass = config_1.JWT_PASSWORD;
const SignupMid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const response = yield schema_1.User.findOne({
        username: username
    });
    if (!response) {
        next();
    }
    else {
        res.status(409).json({
            msg: "User Already Exists!"
        });
    }
});
exports.SignupMid = SignupMid;
const SigninMid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const response = yield schema_1.User.findOne({
        username: username
    });
    if (response) {
        const check = yield bcrypt_1.default.compare(password, response.password);
        if (check) {
            //@ts-ignore
            req.user = response;
            next();
        }
        else {
            res.status(400).json({
                msg: "Password Wrong!"
            });
        }
    }
    else {
        res.status(404).json({
            msg: "User Doesn't Exists!"
        });
    }
});
exports.SigninMid = SigninMid;
const ContentMid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        const response = jsonwebtoken_1.default.verify(token, pass);
        if (response) {
            //@ts-ignore
            req.user = response;
            next();
        }
        else {
            res.json({
                msg: "Login Again!"
            });
        }
    }
    catch (err) {
        res.json({
            msg: "Invalid token!"
        });
    }
});
exports.ContentMid = ContentMid;
