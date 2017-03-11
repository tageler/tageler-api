function tagelerController() {
    var tageler = require('../models/tagelerModel');
    var mongo = require('mongodb');

    this.createTageler = function (req, res) {
        var title = req.params.title;
        var unit = req.params.unit;
        var start = req.params.start;
        var end = req.params.end;
        var bring_along = req.params.bring_along;
        var uniform = req.params.uniform;
        var picture = req.params.picture;
        var checkout_deadline = req.params.checkout_deadline;

        tageler.create({
            title: title,
            unit:unit,
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
        tageler.find({}, function(err, result){
            if(err){
                console.log(err);
            }else{
                return res.send({'tagelers':result});
            }
        });
    };

    this.getTagelerById = function(req, res) {
        tageler.findOne({ "_id": mongo.ObjectId(req.params._id) }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                return res.send({'tageler': result});
            }
        });
    };

    return this;


}

module.exports = new tagelerController();