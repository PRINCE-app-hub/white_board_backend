require('dotenv').config();
const mongoose = require('mongoose');



const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.connectionString, {
      useNewUrlParser: true
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

module.exports = connectToDatabase;
