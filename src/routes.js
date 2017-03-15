/**
 * All GET/POST requests will be routed through here
 */
module.exports = function (server) {
    var tageler = require('./controllers/tagelerController');
    var unit = require('./controllers/unitController');

    //TODO HTML with all API methods here as reference
    server.get('/', function (req, res) {
        return res.send("The game is on!");
    });
    // tageler requests
    server.post('/createTageler', tageler.createTageler);
    server.get('/getTageler', tageler.getTageler);
    server.get('/getTagelerById/:id', tageler.getTagelerById);
    server.put('/updateTageler/:id', tageler.updateTageler);
    server.del('/deleteTageler/:id', tageler.deleteTageler);
    // unit requests
    server.post('/createUnit', unit.createUnit);
    server.get('/getUnit', unit.getUnit);
    server.put('/updateUnit/:id', unit.updateUnit);
    server.del('/deleteUnit/:id', unit.deleteUnit);
};