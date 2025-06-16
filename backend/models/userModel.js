const mongoose=require ('mongoose'); 
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{
        type:String , required:true,unique:true
    },
    password:{type: String , required: true}
}); 

userSchema.pre('save',async(next)=>{
    if(!this.isModified('password')) return next(); 
    this.password=await bycrypt.hash(this.password,10); 
    next();
}); 


const User =mongoose.model('User',userSchema); 