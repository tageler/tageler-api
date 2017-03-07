function tagelerController() {
    var tageler = require('../models/tagelerModel');

    this.createTageler = function (req, res) {
        var titel = req.params.titel;
        var einheit = req.params.einheit;
        var start = req.params.start;
        var ende = req.params.ende;
        var mitnehmen = req.params.mitnehmen;
        var tenue = req.params.tenue;
        var bild = req.params.bild;
        var abmeldefrist = req.params.abmeldefrist;

        tageler.create({
            titel: titel,
            einheit:einheit,
            start: start,
            ende: ende,
            mitnehmen: mitnehmen,
            tenue: tenue,
            bild: bild,
            abmeldefrist: abmeldefrist
        },function(err,result){
            if (err) {
                console.log(err);
                return res.send({'error':err});
            } else {
                return res.send({'result': result, 'status': 'u has nu tageler now!'});
            }
        });
    };

    this.getTageler = function (req, res) {
        tageler.find({}, function(err, result){
            if(err){
                console.log(err);
            }else{
                return res.send({'tageler name':result});
            }
        });
    };
    return this;
}

module.exports = new tagelerController();