const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbService = require('./services/database');

dbService.connectMongoose();
/** SET UP API **/
// Set app
const app = express();
// CORS Middleware
app.use(cors());
// Body Parser Middleware, extended limit because picture
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
// Set needed routes
const tagelers = require('./routes/tagelers');
const groups = require('./routes/groups');
const defaultPictures = require('./routes/defaultPictures');
app.use('/api/v1/tageler', tagelers);
app.use('/api/v1/group', groups);
app.use('/api/v1/picture', defaultPictures);

// TODO: No idea what this does
app.use('/public', express.static(__dirname + '/public'));
// Redirects all unknown routes to our 'index'
app.get('*', (req, res) => {
    res.json('The game is on!').end();
});

module.exports = app;