const { sendEmailWithAttachment } = require('../utils/mail');
const { verifyToken } = require('../utils/auth');
const mongoose=require('mongoose');
const express = require('express');
const router=express.Router();
const {signup,login,checkAuth}=require('../controller/userController');
const { body}=require('express-validator'); 
const Canvas=require('../models/canvasModel')
router.post('/send-email', verifyToken, async (req, res) => {
  try {
    const { to, imageBase64 } = req.body;

    if (!to || !imageBase64) {
      return res.status(400).json({ message: 'Email and image are required' });
    }

    await sendEmailWithAttachment({
      to,
      subject: 'Your Whiteboard Export',
      text: 'Please find the whiteboard image attached.',
      imageBase64,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {   
    console.error("❌ Error in sending email:", err);
    return res.status(500).json({ message: 'Failed to send email' });
  }
});
module.exports = router;