const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error')

const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB();

//routes
const bootcamps = require('./routes/bootcamps')

const app = express();

//body parser

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'))
}

app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running on port '.green + PORT.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
    console.log('Error' + err.message);
    server.close(() => {
        process.exit(1);
    });
})