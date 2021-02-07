const express = require('express');
const path = require('path');

const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');

const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB();

//routes
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

const app = express();

//body parser

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'))
}

app.use(fileupload());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running on port '.green + PORT.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
    console.log('Error' + err.message);
    server.close(() => {
        process.exit(1);
    });
})