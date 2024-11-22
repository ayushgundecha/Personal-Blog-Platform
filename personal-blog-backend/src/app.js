const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const blogPostRouter = require('./routes/post');
const authRouter = require('./routes/auth');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('combined'));

app.use('/api', blogPostRouter);

app.use('/api/auth', authRouter);


app.get('/', (req, res)=>{
    res.send('Hello World!');
});

module.exports = app;