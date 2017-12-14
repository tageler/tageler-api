const mongoose = require('mongoose');

// defaultPicture Schema
const DefaultPictureSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // e.g. forest, ..., maybe enum ?
    category: {
        type: String,
        required: false
    },
    group: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: true
    }
});

const DefaultPicture = mongoose.model('DefaultPicture', DefaultPictureSchema);

module.exports = DefaultPicture;

// ###MongoDB###
/*
 *  result on no matches:
 *  findOne(): result == null
 *  find(): result == []
 */
// get
module.exports.getOnePictureById = (id, callback) => {
    DefaultPicture.findOne({_id: id}, callback);
};

module.exports.getOnePictureByName = (name, callback) => {
    DefaultPicture.findOne({name: name}, callback);
};

module.exports.getPicturesByCategory = (category, callback) => {
    DefaultPicture.find({category: category}, callback);
};

module.exports.getPicturesByGroup = (group, callback) => {
    DefaultPicture.find({group: group}, callback);
};

module.exports.getAllPictures = (callback) => {
    DefaultPicture.find(callback);
};

//save
module.exports.saveOnePicture = (pictureToSave, callback) => {
    pictureToSave.save(callback);
};

//delete
module.exports.deleteOnePictureById = (id, callback) => {
    DefaultPicture.findOneAndRemove({_id: id}, callback);
};

//update
module.exports.updateOnePictureById = (id, pictureToUpdate, callback) => {
    DefaultPicture.findOneAndUpdate({_id: id}, pictureToUpdate, {new: true, runValidators: true}, callback);
};
module.exports.updateOnePictureByName = (name, pictureToUpdate, callback) => {
    DefaultPicture.findOneAndUpdate({name: name}, pictureToUpdate, {new: true, runValidators: true}, callback);
};