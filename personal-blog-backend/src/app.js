const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");

require('dotenv').config();

const blogPostRouter = require('./routes/post');
const authRouter = require('./routes/auth');

const app = express();



app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000", // Replace with your frontend URL
      credentials: true, // Allow credentials (cookies) to be sent
    })
  );
app.use(morgan('combined'));

app.use('/api', blogPostRouter);

app.use('/api/auth', authRouter);


app.get('/', (req, res)=>{
    res.send('Hello World!');
});

module.exports = app;