const mongoose = require('mongoose');

// Tageler Schema
const TagelerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    group: {
        type: [String],
        required: true
    },
    start: {
        type: Date,
        required: false
    },
    end: {
        type: Date,
        required: false
    },
    bringAlong: {
        type: String,
        required: true
    },
    uniform: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    checkout: {
        deadline: {
            type: Date,
            required: false
        },
        contact: [{
            name: {
                type: String,
                required: false
            },
            phone: {
                type: String,
                required: false
            },
            mail: {
                type: String,
                required: false
            },
            other: {
                type: String,
                required: false
            }
        }]
    },
    free: {
        type: Boolean,
        required: true
    }
});

const Tageler = mongoose.model('Tageler', TagelerSchema);

module.exports = Tageler;

// ###MongoDB###
/*
*  result on no matches:
*  findOne(): result == null
*  find(): result == []
*/
// get
module.exports.getAllTagelers = (callback) => {
    Tageler.find(callback);
};

module.exports.getTagelersByGroup = (group, callback) => {
    Tageler.find({group: group}, callback);
};

module.exports.getOneTagelerById = (_id, callback) => {
    Tageler.findOne({_id: _id}, callback);
};

// save
module.exports.saveOneTageler = (tagelerToSave, callback) => {
    tagelerToSave.save(callback);
};

// delete
module.exports.deleteOneTagelerById = (_id, callback) => {
    Tageler.findOneAndRemove({_id: _id}, callback);
}

module.exports.deleteOneTageler = (tagelerToDelete, callback) => {
    Tageler.remove(tagelerToDelete, callback);
}

// update
module.exports.updateOneTagelerById = (id, tagelerToUpdate, callback) => {
    Tageler.findOneAndUpdate({_id: id}, tagelerToUpdate, {new: true, runValidators: true}, callback);
}