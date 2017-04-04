const mongoose = require('mongoose');

// Group Schema
const GroupSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Meute', 'Trupp', 'Equipe'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    }
});

/** TODO: SHOULDN'T THIS BE IN CONTROLLER? **/
const Group = module.exports = mongoose.model('Group', GroupSchema);

module.exports.addGroup = function (newGroup, callback) {
    newGroup.save(callback);
};

module.exports.getGroupById = function (_id, callback) {
    Group.findOne({_id: _id}, callback);
};

module.exports.getGroups = function (callback) {
    Group.find(callback);
};