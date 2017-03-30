const mongoose = require('mongoose');
const config = require('../config/database');

// Group Schema
const GroupSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Meute','Trupp', 'Equipe'],
        required: true
    },  name: {
        type: String,
        required: true
    }
});

const Group = module.exports = mongoose.model('Group', GroupSchema);

// module.exports.addGroup = function(newGroup, callback){
//     Group.save(callback);
// };

module.exports.getGroupById = function(_id, callback){
    Group.findOne({_id: _id}, callback);
};

module.exports.getGroups = function(callback){
  Group.find(callback);
};

// module.exports.updateGroup = function(_id,callback){
//   Group.find(callback);
// };
// module.exports.deleteGroup = function(_id,callback){
//   Group.find(callback);
// };