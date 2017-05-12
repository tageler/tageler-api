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

// ###MongoDB###
/*
 *  result on no matches:
 *  findOne(): result == null
 *  find(): result == []
 */
// get
module.exports.getOneGroupById = (id, callback) => {
    Group.findOne({_id: id}, callback);
};

module.exports.getAllGroups = (callback) => {
    Group.find(callback);
};

//save
module.exports.saveOneGroup = (groupToSave, callback) => {
    groupToSave.save(callback);
};

//delete
module.exports.deleteOneGroupById = (id, callback) => {
    Group.findOneAndRemove({_id: id}, callback);
};

//update
module.exports.updateOneGroupById = (id, groupToUpdate, callback) => {
    Group.findOneAndUpdate({_id: id}, groupToUpdate, {new: true, runValidators: true}, callback);
};
