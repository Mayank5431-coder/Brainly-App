import { application } from 'express';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const UserSchema = new Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  }
})

const contentSchema = new Schema({
  title : {
    type : String,
    unique : true,
    required : true
  },
  link : {
    type : String,
    required : true
  },
  type : {
    type : String,
    required : true
  },
  tags : [{
    type : Schema.Types.ObjectId,
    ref : 'Tag',
  }],
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  }
})

const LinkSchema = new Schema({
  hash: String,
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})


export const Content = mongoose.model("Content",contentSchema);
export const User = mongoose.model("User",UserSchema);
export const Link = mongoose.model("Link",LinkSchema);