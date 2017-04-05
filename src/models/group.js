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

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;

module.exports.addGroup = (newGroup, callback) => {
    newGroup.save(callback);
};

module.exports.getGroupById = (_id, callback) => {
    Group.findOne({_id: _id}, callback);
};

module.exports.getGroups = (callback) => {
    Group.find(callback);
};