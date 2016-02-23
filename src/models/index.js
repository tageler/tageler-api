const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String
});

module.exports = {
  Group: mongoose.model('group', groupSchema)
};
