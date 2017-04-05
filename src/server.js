const app = require('./app');
// Port Number
const port = 3000;
// Start Server
app.listen(port, () => {
    console.log('App listening on port ' + port);
});