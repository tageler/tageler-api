var app = require('./app');

// Port Number
const port = 3000;

// Start Server
app.listen(port, () =>{
    console.log('Server started on port '+port)
});