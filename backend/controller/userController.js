const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const { generateToken, verifyToken } = require('../utils/auth');

// SIGNUP CONTROLLER
const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const user = new User({
      name,
      email,
      password, // plain password — schema will hash it
      
    });

    await user.save();

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000,
      path: '/',
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.log('Signup error:', err);
    res.status(500).json({ error: err.message });
  }
};
// LOGIN CONTROLLER
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("🛠️ Incoming login payload:", req.body);

  try {
    const user = await User.findOne({ email });
    // console.log("🔍 User found:", user);

    if (!user) {
      return res.status(400).json({ error: 'Invalid email, no user exists for this email' });
    }

  
const isMatch = await bcrypt.compare(password.toString(), user.password.toString());




    if (!isMatch) {
      console.log(password);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000,
      path: '/',
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



// // CHECK AUTH CONTROLLER

const { verifyTokenDirect } = require('../utils/auth');

const checkAuth = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = verifyTokenDirect(token);
    res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = {
  signup,
  login,
  checkAuth,
};
