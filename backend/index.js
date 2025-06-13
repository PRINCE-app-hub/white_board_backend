const express = require('express');
const app = express();
const cors=require('cors'); 
app.use(cors());
app.get('/prince', (req, res) => {
  const sampleData={
    message:"Hello world"
  }
  res.json(sampleData);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
