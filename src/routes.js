/**
 * All GET/POST requests will be routed through here
 */
module.exports = function (server) {
    var cat = require('./controllers/catController');

    //TODO HTML with all API methods
    server.get('/', function (req, res) {
        return res.send("The f is on!");
    });
    server.get('/hello', function (req, res) {
        return res.send("HELLO WORLD!");
    });

    server.post('/createCat', cat.createCat);
    server.get('/getCat', cat.getCat);

};