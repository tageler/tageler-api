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

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder (Angular 2 app)
// app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());


app.use('/v1/tageler', tagelers);

// Index Route
app.get('/', (req, res) => {
    res.send('The game is on!');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
} );

// Start Server
app.listen(port, () =>{
    console.log('Server started on port '+port)
});

