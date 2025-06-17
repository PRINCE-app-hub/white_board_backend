// this one is for user schema with password hashing 
const mongoose=require ('mongoose'); 
const {hashPassword}=require('../utils/auth'); 
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{
        type:String , required:true,unique:true
    },
    password:{type: String , required: true}
}); 

userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    this.password=await hashPassword(this.password);  
   next(); 

}); 


const User =mongoose.model('User',userSchema); 
module.exports =User; 