const mongoose = require('mongoose');
mongoose.Promise = Promise;

//should be either Meute, Trupp or Equipe
module.exports = (function unitSchema() {
    var schema = {
        type: {
            type: String,
            enum: ['Meute', 'Trupp', 'Equipe', 'Pio'],
            default: 'Meute',
            required: true
        },
        name: {
            type: String, required: true
        }
    };

    var collectionName = 'unit';
    var unitSchema = mongoose.Schema(schema);
    var unit = mongoose.model(collectionName, unitSchema);

    return unit;
})();
