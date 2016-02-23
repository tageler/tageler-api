const restify = require('restify');
const mongoose = require('mongoose');
const restifyMongoose = require('restify-mongoose');

const models = require('./models');

const server = restify.createServer();

mongoose.connect('localhost', 'test');

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.pre(restify.CORS());
server.use(restify.fullResponse());

restifyMongoose(models.Group).serve('/api/groups', server);

module.exports = server;
