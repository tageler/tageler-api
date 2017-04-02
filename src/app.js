const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error: '+err);
});

const app = express();

const tagelers = require('./routes/tagelers');
const groups = require('./routes/groups');

// CORS Middleware
app.use(cors());

// Set Static Folder (Angular 2 app)
// app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());


app.use('/api/v1/tageler', tagelers);
app.use('/api/v1/group', groups);

app.use('/public',express.static(__dirname + '/public'));

// Index Route
app.get('/', (req, res) => {
    res.send('The game is on!');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
} );


module.exports = app;