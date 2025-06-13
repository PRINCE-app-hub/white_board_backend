const express = require('express');
const router=express.Router();

router.get('/prince',(req,res)=>{
    res.json({message:"Just got the api using route "})
})

router.post('/users',(req,res)=> {
    const{name,email}=req.body;
    res.json({name,email})
});
module.exports=router;

