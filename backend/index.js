const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
