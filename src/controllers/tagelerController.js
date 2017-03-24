function tagelerController() {
    var tageler = require('../models/tagelerModel');
    var mongo = require('mongodb');
    var startDate = new Date()

    this.createTageler = function (req, res) {
        var title = req.params.title;
        var text = req.params.text;
        var date = req.params.date;
        var unit = req.params.unit;
        var start = req.params.start;
        var end = req.params.end;
        var bring_along = req.params.bring_along;
        var uniform = req.params.uniform;
        var picture = req.params.picture;
        var checkout_deadline = req.params.checkout_deadline;

        tageler.create({
            title: title,
            text: text,
            date: date,
            unit: unit,
            start: start,
            end: end,
            bring_along: bring_along,
            uniform: uniform,
            picture: picture,
            checkout_deadline: checkout_deadline
        },function(err,result){
            if (err) {
                console.log(err);
                return res.send({'error':err});
            } else {
                return res.send({'result': result, 'status': 'New TAGELER has been added!'});
            }
        });
    };

    this.getTageler = function (req, res) {
        tageler.find({"date" : { $gte: new Date(startDate).toISOString() }}, function(err, result){
            if(err){
                console.log(err);
                return res.send({'error': err});
            }else{
                return res.send({'tagelers':result});
            }
        });
    };

    this.getTagelerById = function(req, res) {
        tageler.findOne({ "_id": mongo.ObjectId(req.params._id) }, function(err, data) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                return res.send({'tageler': data});
            }
        });
    };

    this.updateTageler = function (req, res) {
        tageler.findById(mongo.ObjectId(req.params._id), function (err, tageler) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                // this.tageler.update();
                for(var param in req.params){
                    tageler[param] = req.params[param];
                }
                tageler.save(function (err, updatedData) {
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

    this.deleteTageler = function (req, res){
        tageler.findById(mongo.ObjectId(req.params._id), function (err, tageler) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                tageler.remove(function (err, removed) {
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

module.exports = new tagelerController();