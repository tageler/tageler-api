const mongoose = require('mongoose');
const config = require('../config/database');

// Tageler Schema
const TagelerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    unit: {
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
    bring_along: {
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
    checkout_deadline: {
        type: Date,
        required: false
    }
});

const Tageler = module.exports = mongoose.model('Tageler', TagelerSchema);

module.exports.getTagelersByUnit = function(unit, callback){
    Tageler.find({unit: unit}, callback);
};


module.exports.addTageler = function(newTageler, callback){
            newTageler.save(callback);
};

module.exports.getTagelerById = function(_id, callback){
    Tageler.findOne({_id: _id}, callback);
};