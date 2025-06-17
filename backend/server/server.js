// this one is for creating express using middleware and using routes 

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDatabase = require('../db');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToDatabase();

const userRoutes = require('../routes/userRoutes');
app.use('/api', userRoutes);

module.exports=app;