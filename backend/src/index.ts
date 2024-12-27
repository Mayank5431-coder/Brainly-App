import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import cors from 'cors' 
const app = express();
require('dotenv').config();

import {MONGOOSE_URL} from './config'

mongoose.connect(MONGOOSE_URL).then(()=>{
  console.log("Mongoose connected successfully");
});

app.use(cors());
app.use(express.json());

app.use("/api/v1",router);

app.listen(3000,()=>{
  console.log(`working on port -> ${3000}`);
});