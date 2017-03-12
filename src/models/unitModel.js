const mongoose = require('mongoose');
//Without next line there will be a deprecated warning
mongoose.Promise = Promise;

module.exports = (function unitSchema () {
    var schema = {
        //should be either Meute, Trupp or Equipe
        name: {type: String, required: true}
    };
    var collectionName = 'unit';
    var unitSchema = mongoose.Schema(schema);
    var unit = mongoose.model(collectionName, unitSchema);

    return unit;
})();
