// this is just for api 

const express = require('express');
const router=express.Router();
const {signup,login}=require('../controller/userController');
const { body}=require('express-validator'); 
const {verifyToken} =require('../utils/auth'); 
router.post('/signup',
    [body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')],
        signup);

router.post('/login',[body('email').isEmail().withMessage('Enter a valid email')
    ,body('password').notEmpty().withMessage('Password is required')
],login)

router.get('/protected',verifyToken,(req,res)=>{
     res.json({message: 'You are authorized!', user:req.user});
});

module.exports=router;

