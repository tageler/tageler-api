const mongoose = require('mongoose');
//Without next line there will be a deprecated warning
mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String
});

module.exports = {
  Group: mongoose.model('group', groupSchema)
};
