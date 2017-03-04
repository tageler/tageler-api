const mongoose = require('mongoose');
//Without next line there will be a deprecated warning
mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const catSchema = {
    name: {type: String, required: true}
};

module.exports = (function catSchema () {


    var schema = {
        name: {type: String, required: true}
    };
    var collectionName = 'cat';
    var catSchema = mongoose.Schema(schema);
    var cat = mongoose.model(collectionName, catSchema);

    return cat;
})();