import {Router} from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
require("dotenv").configs;
import {User,Content,Link} from './schema';
const router = Router();
import { SignupMid , SigninMid , ContentMid} from './middlewares';
require('dotenv').config();
import bcrypt from 'bcrypt'
require('dotenv').config();
import {random} from './utils';


import {JWT_PASSWORD} from './config'

const pass = JWT_PASSWORD;


router.post("/signup",SignupMid ,async (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  const passkey = await bcrypt.hash(password,12);
  try{
    await User.create({
      username : username,
      password : passkey
    })
    res.status(200).json({
      msg : "User Created Successfully"
    })
  }catch(e){
    res.status(500).json({
      msg : "Error creating a new user , try later!"
    })
  }
})

router.post("/signin" ,SigninMid, async (req,res)=>{
  //@ts-ignore
  const user = req.user;
  const token = jwt.sign({
    username : user.username,
    id_ : user._id,
    password : user.password
  },pass);
  res.json({
    token : token
  })
})

router.post("/content", ContentMid , async (req,res)=>{
  const {title , link , type} = req.body;
  //@ts-ignore
  const id = req.user.id_;
  try{
    const response = await Content.create({
      title : title,
      link : link,
      type : type,
      tags : [],
      userId : id
    })
    if(response){
      res.json({
        msg : "Content Added SuccessFully!"
      })
    }
    else{
      res.json({
        msg : "This title already exists! , please try with other"
      })
    }
  }catch(err){
    res.json({
      msg : "Try Later!"
    })
  }
})

router.get("/content", ContentMid ,async (req,res)=>{
  //@ts-ignore
  const userId = req.user.id_ ;
  const course = await Content.find({
    userId : userId
  }).populate("userId","username");
  if(course){
    res.json({
      course
    })
  }else{
    res.json({
      msg : "No Content present!"
    })
  }
})

router.delete("/content", ContentMid ,async (req,res)=>{
  //@ts-ignore
  const userId = req.user.id_;
  const title = req.body.title;
  try{
    const obj = await Content.deleteMany({
      userId : userId,
      title : title
    })
    if(obj?.deletedCount){
      res.json({
        msg : "Content Deleted successfully!"
      })
    }else{
      res.json({
        msg : "Content doesn't Exists in the Database"
      })
    }
  }catch(err){
    res.json({
      msg : "Can't delete your content please try later!"
    })
  }
})

router.post("/brain/share", ContentMid ,async (req,res)=>{
  const share = req.body.share;
  if (share) {
          const existingLink = await Link.findOne({
             //@ts-ignore
              userId: req.user.id_
          });

          if (existingLink) {
              res.json({
                  hash: existingLink.hash
              })
              return;
          }
          const hash = random(10);
          await Link.create({
            //@ts-ignore
              userId: req.user.id_,
              hash: hash
          })

          res.json({
              hash
          })
  } else {
      await Link.deleteOne({
          //@ts-ignore
          userId: req.user.id_,
      });

      res.json({
          message: "Removed link"
      })
  }
})

router.get("/brain/:shareLink", ContentMid ,async (req,res)=>{
  const hash = req.params.shareLink;

  const link = await Link.findOne({
      hash
  });

  if (!link) {
      res.status(411).json({
          message: "Sorry incorrect input"
      })
      return;
  }
  // userId
  const content = await Content.find({
      userId: link.userId
  })

  console.log(link);
  const user = await User.findOne({
      _id: link.userId
  })

  if (!user) {
      res.status(411).json({
          message: "user not found, error should ideally not happen"
      })
      return;
  }

  res.json({
      username: user.username,
      content: content
  })

})

export default router;