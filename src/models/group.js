const mongoose = require('mongoose');
const config = require('../config/database');

// Group Schema
const GroupSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Meute','Trupp', 'Equipe'],
        default: 'Meute',
        required: true
    },
    name: {
        type: String,
        required: false
    }
});

const Group = module.exports = mongoose.model('Group', GroupSchema);

