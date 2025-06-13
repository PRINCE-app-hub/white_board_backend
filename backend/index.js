require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDatabase = require('./db');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToDatabase();

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Hello world" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
