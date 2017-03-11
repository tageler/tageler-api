/**
 * All GET/POST requests will be routed through here
 */
module.exports = function (server) {
    var tageler = require('./controllers/tagelerController');

    //TODO HTML with all API methods
    server.get('/', function (req, res) {
        return res.send("The game is on!");
    });
    server.get('/hello', function (req, res) {
        return res.send("HELLO WORLD!");
    });

    server.post('/createTageler', tageler.createTageler);
    server.get('/getTageler', tageler.getTageler);
    server.get('/getTagelerById/:id', tageler.getTagelerById);
};