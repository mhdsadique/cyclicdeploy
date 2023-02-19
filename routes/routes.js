

const express=require("express")

const userRouter=express.Router()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserModel}=require("../model/model")

userRouter.get("/",async(req,res)=>{
    let query=req.query
    try{
        const users=await UserModel.find(query)
        res.send(users)
    }catch(e){
        res.send({"msg":"cannot get the users","error":e.message})
    }
})
userRouter.post("/singup",async(req,res)=>{
    let {password,email,name}=req.body
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
      if(err) res.send({"msg":"cannot get the users","error":e.message})
      else {
          const users=new UserModel({name,email,password:hash})
        await  users.save()
        res.send({"msg":"singup successfully"})
      }    
        });
    }catch(e){
        res.send({"msg":"cannot get the users","error":e.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body
    console.log(req.body)
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err, result)=> {
                if(result){

                    var token = jwt.sign({ userId: user[0]._id }, 'masai');        
                    res.send({"msg":"login successfully","token":token})
                }
                else{
               res.send({"msg":"cannot get the users","error":err.message})               
                }
            });
        }else{
            res.send({"msg":"wrong credentiol...pls check again"})
        }
    }catch(e){
        res.send({"msg":"cannot get the users","error":e.message})
    }
})

module.exports={userRouter}