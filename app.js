const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
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

const users = require('./routes/users');
const tagelers = require('./routes/tagelers');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder (Angular 2 app)
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session())

require('./config/passport')(passport);

app.use('/tagelers', tagelers);
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
} );

// Start Server
app.listen(port, () =>{
    console.log('Server started on port '+port)
});

