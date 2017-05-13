const mongoose = require('mongoose');
const sharp = require('sharp');

// Tageler Schema
const TagelerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    group: {
        type: [String],
        required: true
    },
    start: {
        type: Date,
        required: false
    },
    end: {
        type: Date,
        required: false
    },
    bringAlong: {
        type: String,
        required: true
    },
    uniform: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    pictureSmall: {
        type: String,
        required: false
    },
    checkout: {
        deadline: {
            type: Date,
            required: false
        },
        contact: [{
            name: {
                type: String,
                required: false
            },
            phone: {
                type: String,
                required: false
            },
            mail: {
                type: String,
                required: false
            },
            other: {
                type: String,
                required: false
            }
        }]
    },
    free: {
        type: Boolean,
        required: true
    },
    background_color: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    font_family: {
        type: String,
        required: false,
    }

});

const Tageler = mongoose.model('Tageler', TagelerSchema);

module.exports = Tageler;

// ###MongoDB###
/*
*  result on no matches:
*  findOne(): result == null
*  find(): result == []
*/
// get
module.exports.getAllTagelers = (callback) => {
    Tageler.aggregate(
        [
            {
                $addFields: {
                    picture: "$pictureSmall"
                }
            }, {
                $project: {
                    pictureSmall: 0
                }
            }
        ]
    ).exec(callback);
};

module.exports.getTagelersByGroup = (group, callback) => {
    Tageler.aggregate(
        [
            {
                $match: {
                    group: group
                }
            }, {
                $addFields: {
                    picture: "$pictureSmall"
                }
            }, {
                $project: {
                    pictureSmall: 0
                }
            }
        ]
    ).exec(callback);
};

module.exports.getOneTagelerById = (_id, callback) => {
    Tageler.findOne({ _id: _id }, callback);
};

// save
module.exports.saveOneTageler = (tagelerToSave, callback) => {
    resizeImageAndMigrate(tagelerToSave,
        (resTageler, callback) => { resTageler.save(callback) },
        callback);
};

// delete
module.exports.deleteOneTagelerById = (_id, callback) => {
    Tageler.findOneAndRemove({ _id: _id }, callback);
}

module.exports.deleteOneTageler = (tagelerToDelete, callback) => {
    Tageler.remove(tagelerToDelete, callback);
}

// update
module.exports.updateOneTagelerById = (id, tagelerToUpdate, callback) => {
    resizeImageAndMigrate(tagelerToUpdate,
        (resTageler, callback) => {
            Tageler.findOneAndUpdate({ _id: id }, resTageler, { new: true, runValidators: true }, callback)
        },
        callback);
}

function resizeImageAndMigrate(tageler, dbFunction, callback) {
    if (tageler.picture != null) {
        let img = Buffer.from(tageler.picture, 'base64');
        sharp(img)
            .resize(318)
            .withoutEnlargement(true)
            .toBuffer()
            .then(data => {
                tageler.pictureSmall = data.toString('base64');
                dbFunction(tageler, callback);
            }).catch(err => {
                tageler.pictureSmall = tageler.picture;
                dbFunction(tageler, callback);
            })
    } else {
        tageler.pictureSmall = tageler.picture;
        dbFunction(tageler, callback);
    }
}