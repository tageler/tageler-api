function unitController() {
    var unit = require('../models/unitModel');
    var mongo = require('mongodb');

    this.createUnit = function (req, res) {
        var name = req.params.name;
        var type = req.params.type;
        console.log('unit: '+ name);

        unit.create({
            type: type,
            name: name
        },function(err,result){
            if (err) {
                console.log(err);
                return res.send({'errors':err});
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