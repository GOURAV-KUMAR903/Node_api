const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT;
const authroutes = require('./routes/authroutes'); 


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


// Example of a POST route

app.use('/user', authroutes);

mongoose.connect('mongodb://localhost:27017/nodeapi', {
   
  })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));
// Start the server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
