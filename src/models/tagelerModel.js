const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = (function tagelerSchema() {
    var schema = {
        title: {
            type: String, required: true
        },
        text: {
            type: String, required: false
        },
        date: {
            type: Date, required: true
        },
        unit: {
            type: String, required: true
        },
        start: {
            type: String, required: true
        },
        end: {
            type: String, required: true
        },
        bring_along: {
            type: String, required: true
        },
        uniform: {
            type: String, required: true
        },
        picture: {
            type: String, required: false
        },
        checkout_deadline: {
            type: Date, required: true
        }
    };

    var collectionName = 'tageler';
    var tagelerSchema = mongoose.Schema(schema);
    var tageler = mongoose.model(collectionName, tagelerSchema);

    return tageler;
})();
