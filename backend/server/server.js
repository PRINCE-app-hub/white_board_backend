// this one is for creating express using middleware and using routes 

require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true                
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectToDatabase = require('../db');
connectToDatabase();

const userRoutes = require('../routes/userRoutes');
app.use('/api', userRoutes);

module.exports=app;