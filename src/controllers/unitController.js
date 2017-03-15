function unitController() {
    var unit = require('../models/unitModel');
    var mongo = require('mongodb');

    this.createUnit = function (req, res) {
        var name = req.params.name;
        var type = req.params.type;

        unit.create({
            type: type,
            name: name
        }, function (err, result) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                return res.send({'result': result, 'status': 'New UNIT has been added!'});
            }
        });
    };

    this.getUnit = function (req, res) {
        unit.find({}, function (err, result) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                return res.send({'units': result});
            }
        });
    };

    this.updateUnit = function (req, res) {
        unit.findById(mongo.ObjectId(req.params._id), function (err, unit) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                for(var param in req.params){
                    unit[param] = req.params[param];
                }
                unit.save(function (err, updatedData) {
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({'unit': updatedData});
                    }
                });
            }
        });
    };

    this.deleteUnit = function (req, res){
        unit.findById(mongo.ObjectId(req.params._id), function (err, unit) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                unit.remove(function (err, removed) {
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        return res.send({'unit': removed});
                    }
                });
            }
        });
    };

    return this;
}

module.exports = new unitController();
