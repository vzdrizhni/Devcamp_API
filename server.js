const express = require('express');
const dotenv = require('dotenv');

//routes
const bootcamps = require('./routes/bootcamps')

dotenv.config({path: './config/config.env'})

const app = express();

app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('server running on port ' + PORT))