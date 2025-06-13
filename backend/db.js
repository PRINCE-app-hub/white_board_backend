require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = `mongodb+srv://prince:prince33@cluster0.bjfgvcc.mongodb.net/whiteboard?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

module.exports = connectToDatabase;
