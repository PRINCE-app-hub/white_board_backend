const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const generateToken=(user)=>{
  const payload={
    id: user._id,
    email:user.email
  }; 
  return jwt.sign(payload,process.env.JWT_SECRET,{
    expiresIn:'5d'
  });
};
const verifyToken =(req,res,next)=>{
  const token=req.headers.authorization?.split(' ')[1];
  if(!token){
    return res.status(401).json({error: 'Access Denied. No token provided'})
  }
  try{
    const decoded_user=jwt.verify(token,process.env.JWT_SECRET); 
    req.user=decoded_user;
    next(); 
  }
  catch(err){
    return res.status(400).json({error: 'Invaid token '});
  }
}
module.exports = {
  hashPassword,
  generateToken,
  verifyToken
};
