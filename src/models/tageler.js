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
    }
});

const Tageler = mongoose.model('Tageler', TagelerSchema);
module.exports = Tageler;

/** TODO: SHOULDN'T THIS BE IN CONTROLLER? **/
module.exports.getTagelersByGroup = (group, callback) => {
    Tageler.find({group: group}, callback);
};

module.exports.addTageler = (newTageler, callback) => {
    // if (newTageler.picture){
    //     console.log("pic-url: " +
    //     JSON.stringify(newTageler, null, 4));
    // }
    newTageler.save(callback);
};

module.exports.getTagelerById = (_id, callback) => {
    Tageler.findOne({_id: _id}, callback);
};

module.exports.getTagelers = (callback) => {
    Tageler.find(callback);
};