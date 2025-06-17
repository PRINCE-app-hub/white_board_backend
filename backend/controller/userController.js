// this one is to controll signup and login 
const {validationResult} =require('express-validator'); 
const User = require('../models/userModel'); 


const signup= async (req,res)=>{
    const errors =validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 

    }
    const {name,email,password}=req.body; 
    try{
        const user = new User({
            name,email, password
        }); 
        await user.save();
        res.status(201).json({message: 'User created successfully'}); 
    }
    catch(err){
        res.status(500).json({error:err.message}); 
        }

}; 
module.exports={signup};