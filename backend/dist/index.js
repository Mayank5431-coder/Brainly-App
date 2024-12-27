"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
require('dotenv').config();
const config_1 = require("./config");
mongoose_1.default.connect(config_1.MONGOOSE_URL).then(() => {
    console.log("Mongoose connected successfully");
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.listen(3000, () => {
    console.log(`working on port -> ${3000}`);
});
