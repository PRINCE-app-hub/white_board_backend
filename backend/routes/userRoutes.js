// this is just for api 

const express = require('express');
const router=express.Router();
const {signup,login,checkAuth}=require('../controller/userController');
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
const { sendEmailWithAttachment } = require('../utils/mail');
router.get('/check-auth', verifyToken, checkAuth);
router.get('/test-email', async (req, res) => {
  try {
    await sendEmailWithAttachment({
      to: 'yourtestemail@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email from the whiteboard app!',
      imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
    });

    res.status(200).json({ message: 'Test email sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Email failed', error: err.toString() });
  }
});
module.exports=router;

