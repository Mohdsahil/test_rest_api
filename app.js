require('dotenv').config();
const pool = require('./config/database')
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');

app.use(express.json());

app.use('/api/users', userRouter);

// node app api

app.listen(process.env.APP_PORT,()=> {
    console.log('surver up and running running');
})