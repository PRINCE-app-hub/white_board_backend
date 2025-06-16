const bcrypt = require('bcrypt'); 
const { password } = require('../models/userModel');
const hashPassword= async (password)=>{
    const saltRound=10; 
    const salt=await bycrypt.genSalt(saltRound); 
    const hashedPassword=await bcrypt.hash(password,salt); 
    return hashedPassword; 
}; 



module.exports ={
    hashPassword
}