const mongoose = require('mongoose');
//Without next line there will be a deprecated warning
mongoose.Promise = Promise;

module.exports = (function tagelerSchema () {
    var schema = {
        title: {type: String, required: true},
        unit: {type: String, required: true},
        start: {type: Date, required: true},
        end: {type: Date, required: true},
        bring_along: {type: String, required: true},
        uniform: {type: String, required: true},
        picture: {type: String, required: true},
        checkout_deadline: {type: Date, required: true}
    };
    var collectionName = 'tageler';
    var tagelerSchema = mongoose.Schema(schema);
    var tageler = mongoose.model(collectionName, tagelerSchema);

    return tageler;
})();