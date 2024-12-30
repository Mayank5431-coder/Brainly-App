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
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").configs;
const schema_1 = require("./schema");
const router = (0, express_1.Router)();
const middlewares_1 = require("./middlewares");
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const config_1 = require("./config");
const pass = config_1.JWT_PASSWORD;
router.post("/signup", middlewares_1.SignupMid, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const passkey = yield bcrypt_1.default.hash(password, 12);
    try {
        yield schema_1.User.create({
            username: username,
            password: passkey
        });
        res.status(200).json({
            msg: "User Created Successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            msg: "Error creating a new user , try later!"
        });
    }
}));
router.post("/signin", middlewares_1.SigninMid, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({
        username: user.username,
        id_: user._id,
        password: user.password
    }, pass);
    res.json({
        token: token
    });
}));
router.post("/content", middlewares_1.ContentMid, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type } = req.body;
    //@ts-ignore
    const id = req.user.id_;
    try {
        const response = yield schema_1.Content.create({
            title: title,
            link: link,
            type: type,
            tags: [],
            userId: id
        });
        if (response) {
            res.json({
                msg: "Content Added SuccessFully!"
            });
        }
        else {
            res.json({
                msg: "This title already exists! , please try with other"
            });
        }
    }
    catch (err) {
        res.json({
            msg: "Try Later!"
        });
    }
}));
router.get("/content", middlewares_1.ContentMid, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user.id_;
    const course = yield schema_1.Content.find({
        userId: userId
    }).populate("userId", "username");
    if (course) {
        res.json({
            course
        });
    }
    else {
        res.json({
            msg: "No Content present!"
        });
    }
}));
router.delete("/content", middlewares_1.ContentMid, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user.id_;
    const title = req.body.title;
    try {
        const obj = yield schema_1.Content.deleteMany({
            userId: userId,
            title: title
        });
        if (obj === null || obj === void 0 ? void 0 : obj.deletedCount) {
            res.json({
                msg: "Content Deleted successfully!"
            });
        }
        else {
            res.json({
                msg: "Content doesn't Exists in the Database"
            });
        }
    }
    catch (err) {
        res.json({
            msg: "Can't delete your content please try later!"
        });
    }
}));
router.post("/brain/share", (req, res) => {
});
router.get("/brain/:shareLink", (req, res) => {
});
exports.default = router;
