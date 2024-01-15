const express =require('express');
const User =require('../models/User')
const {body,validationResult}=require('express-validator');
const { Db } = require('mongodb');
const router=express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET="harshharsh";

router.post('/createuser',[
    body('email','enter valid email').isEmail(),body('name','enter valid name').isLength({min:5}),body('password','enter valid password').isLength({min:5})
],async (req,res)=>{
    const result=validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({result:result.array()});
    }
    try{
    let user= await User.findOne({email:req.body.email});
    if(user){
        res.status(400).json({result:result.array()});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    })
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})
}
catch(err){
    console.log(err.message);
    res.status(500).send("some error occured");
}
    
})
router.post('/login',[body('email','enter correct email').isEmail(),body('password','password cannot be empty').exists()],async (req,res)=>{
    const result=validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({result:result.array()});
    }
    
    
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email});
        if(!user){
            console.log("yaha");
            return res.status(400).json({error:"please try to login with correct credentials"});
        }
       
        const passCmp=await bcrypt.compare(password,user.password);
       
        if(!passCmp){
            return res.status(400).json({error:"please try to login with correct credentials"});
        }
        const payload={
            user:{
                id:user.id
            }
        }
        const authtoken =jwt.sign(payload, JWT_SECRET);
        res.json({authtoken})
    } catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
    
    
})

//get details of logged in user without any username or password
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password") 
        res.send(user);
    } catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
    
})

module.exports=router;