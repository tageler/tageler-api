const restify = require('restify');
const mongoose = require('mongoose');
const restifyMongoose = require('restify-mongoose');

const models = require('./models');

const server = restify.createServer();

mongoose.connect(
  process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost',
  process.env.MONGODB_DATABASE_NAME || 'tageler'
);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.pre(restify.CORS());
server.use(restify.fullResponse());

//TODO HTML with all API methods
server.get('/', function(req, res) {
    return res.send("The game is on!");
});
server.get('/hello', function(req, res) {
    return res.send("HELLO WORLD!");
});

restifyMongoose(models.Group).serve('/api/groups', server);

module.exports = server;
