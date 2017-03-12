function unitController() {
    var unit = require('../models/unitModel');
    var mongo = require('mongodb');

    this.createUnit = function (req, res) {
        var unit = req.params.unit;

        unit.create({
            unit: unit
        },function(err,result){
            if (err) {
                console.log(err);
                return res.send({'error':err});
            } else {
                return res.send({'result': result, 'status': 'New UNIT has been added!'});
            }
        });
    };

    this.getUnit = function (req, res) {
        unit.find({}, function(err, result){
            if(err){
                console.log(err);
            }else{
                return res.send({'unit':result});
            }
        });
    };

    return this;


}

module.exports = new unitController();