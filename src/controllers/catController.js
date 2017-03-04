function catController() {
    var cat = require('../models/catModel');

    this.createCat = function (req, res) {
        var name = req.params.name;

        cat.create({name: name},function(err,result){
            if (err) {
                console.log(err);
                return res.send({'error':err});
            } else {
                return res.send({'result': result, 'status': 'u has nu cat now!'});
            }
        });
    };

    this.getCat = function (req, res) {
        cat.find({}, function(err, result){
            if(err){
                console.log(err);
            }else{
                return res.send({'cat name':result});
            }
        });
    };
    return this;
}

module.exports = new catController();