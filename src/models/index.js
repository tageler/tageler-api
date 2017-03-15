const mongoose = require('mongoose');
mongoose.Promise = Promise;


exports.Tageler = require('./tagelerModel')(mongoose);
exports.Unit = require('./unitModel')(mongoose);


/*
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String
});

module.exports = {
  Group: mongoose.model('group', groupSchema)
};*/
