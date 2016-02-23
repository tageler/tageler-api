const restify = require('restify');
const mongoose = require('mongoose');
const restifyMongoose = require('restify-mongoose');

const models = require('./models');

const server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.pre(restify.CORS());
server.use(restify.fullResponse());

restifyMongoose(models.Group).serve('/api/groups', server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
