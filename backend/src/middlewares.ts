import { NextFunction,Request,Response } from "express";
import {User} from './schema'
import jwt from 'jsonwebtoken'
require('dotenv').config();
import bcrypt from 'bcrypt';
require('dotenv').config();

import {JWT_PASSWORD} from './config'

const pass = JWT_PASSWORD;

export const SignupMid = async (req : Request,res : Response, next : NextFunction)=>{
  const username = req.body.username;
  const response = await User.findOne({
    username : username
  })
  if(!response){
    next();
  }else{
    res.status(409).json({
      msg : "User Already Exists!"
    })
  }
}

export const SigninMid = async (req : Request,res : Response, next : NextFunction)=>{
  const username = req.body.username;
  const password = req.body.password;
  const response = await User.findOne({
    username : username
  })
  if(response){
    const check = await bcrypt.compare(password,response.password);
    if(check){
      //@ts-ignore
      req.user = response;
      next();
    }
    else{
        res.status(400).json({
        msg : "Password Wrong!"
      })
    }
  }
  else{
    res.status(404).json({
      msg : "User Doesn't Exists!"
    })
  }
}

export const ContentMid = async (req : Request,res : Response, next : NextFunction)=>{
  const token = req.headers.authorization;
  try{
    const response = jwt.verify(token as string,pass);
    if(response){
      //@ts-ignore
      req.user = response;
      next();
    }else{
      res.json({
        msg : "Login Again!"
      })
    }
  }
  catch(err){
    res.json({
      msg : "Invalid token!"
    })
  }
}