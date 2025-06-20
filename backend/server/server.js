// this one is for creating express using middleware and using routes 

require('dotenv').config();
const http = require('http');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

const cors = require('cors');
const server = http.createServer(app);
const {Server} =require("socket.io"); 

const io =new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    credentials:true
  },
}); 
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true                
}));
app.use(cookieParser());
const connectToDatabase = require('../db');
connectToDatabase();
const emailRoutes = require('../models/emailRoutes'); 
app.use('/api', emailRoutes);
const userRoutes = require('../routes/userRoutes');
app.use('/api', userRoutes);
io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });

  // Example draw broadcast
  socket.on("draw-element", (element) => {
    // console.log("🎨 Got draw-element:", element);
    socket.broadcast.emit("draw-element", element); // send to all except sender
    io.emit("draw-element", element); // Sends to everyone

  });
});

module.exports={app,server};