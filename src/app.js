const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

/** CONNECT TO MONGOOSE **/
// Mongoose default promise library is deprecated
mongoose.Promise = global.Promise;
// Connect To Database
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to Database: ' + err);
});

/** SET UP API **/
// Set app
const app = express();
// CORS Middleware
app.use(cors());
// Body Parser Middleware, extended limit because picture
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
// Set needed routes
const tagelers = require('./routes/tagelers');
const groups = require('./routes/groups');
const index = require('./routes/index');
app.use('/api/v1/tageler', tagelers);
app.use('/api/v1/group', groups);
app.use('/', index);

// TODO: No idea what this does
app.use('/public', express.static(__dirname + '/public'));
// TODO: No idea what this does
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;