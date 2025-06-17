// this is just for api 

const express = require('express');
const router=express.Router();
const {signup}=require('../controller/userController');
const { body}=require('express-validator'); 

router.post('/signup',
    [body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')],
        signup);


module.exports=router;

