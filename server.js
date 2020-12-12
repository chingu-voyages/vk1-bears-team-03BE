const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config({path: './config/config.env'});

connectDB();


const assets = require('./routes/assets');
const users = require('./routes/users');

const app = express();

app.use(express.json());

app.use(cors());

// if(process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

app.use('/api/v1/assets', assets);
app.use('/api/v1/users', users);


const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to our Asset Management Backend!</h1>')
});

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

