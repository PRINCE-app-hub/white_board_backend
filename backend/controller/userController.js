// this one is to controll signup and login 
const bcrypt = require('bcrypt');
const {validationResult} =require('express-validator'); 
const User = require('../models/userModel'); 
const { hashPassword, generateToken, verifyToken } = require('../utils/auth');


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
        console.log('Login error: ', err);
        res.status(500).json({error:err.message}); 
        }

}; 
// const login =async (req,res)=>{
//     const {email,password}=req.body; 
//     try{
//         const user=await User.findOne({email}); 
//         if(!user) {
//             return res.status(400).json({error:'Invalid email , No user exist for this email'});
//         }
//         const isMatch = await bcrypt.compare(password,user.password); 
//         if(!isMatch){
//             return res.status(400).json({error:
//                 'Invalid email or password'
//             });
//         }
//         const token=generateToken(user); 
//         res.status(200).json({
//             message:'Login succesfully',token,
//             user: {
//                   name: user.name,
//                   email:user.email 
//             }
//         })
//     }
//     catch(error){
//         console.log("Server side error is :", error);
//         res.status(500).json({error:'Server error'}); 
//     }
// }; 
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid email, no user exists for this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Lax", 
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Server side error is:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const checkAuth = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = verifyToken(token);
    res.status(200).json({ user: { name: decoded.name, email: decoded.email } });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
module.exports={signup,
    login,checkAuth

};