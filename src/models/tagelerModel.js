const mongoose = require('mongoose');
//Without next line there will be a deprecated warning
mongoose.Promise = Promise;

module.exports = (function tagelerSchema () {


    var schema = {
        titel: {type: String, required: true},
        einheit: {type: String, required: true},
        start: {type: Date, required: true},
        ende: {type: String, required: true},
        mitnehmen: {type: String, required: true},
        tenue: {type: String, required: true},
        bild: {type: String, required: true},
        abmeldefrist: {type: String, required: true}
    };
    var collectionName = 'tageler';
    var tagelerSchema = mongoose.Schema(schema);
    var tageler = mongoose.model(collectionName, tagelerSchema);

    return tageler;
})();