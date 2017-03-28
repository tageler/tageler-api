const mongoose = require('mongoose');
const config = require('../config/database');

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
    checkout: [{
        checkout_deadline: {
            type: Date,
            required: false
        },
        checkout_contact: {
            type: String,
            required: false,
        },
        checkout_date: {
            type: Date,
            required: false
        },
        checkout_phone: {
            type: String,
            required: false
        }
    }]
});

const Tageler = module.exports = mongoose.model('Tageler', TagelerSchema);

module.exports.getTagelersByGroup = function(group, callback){
    Tageler.find({group: group}, callback);
};


module.exports.addTageler = function(newTageler, callback){
            newTageler.save(callback);
};

module.exports.getTagelerById = function(_id, callback){
    Tageler.findOne({_id: _id}, callback);
};

module.exports.getTagelers = function(callback){
  Tageler.find(callback);
};