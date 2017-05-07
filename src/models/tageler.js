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
            } ,{
                $addFields: {
                    picture: "$pictureSmall"
                }
            } , {
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
    if (tagelerToSave.picture != null) {
        // console.log(tagelerToSave.picture)
        let img = Buffer.from(tagelerToSave.picture, 'base64');
        if (img.byteLength == 3) {
            console.log("toSave: " + tagelerToSave.picture);
        }
        sharp(img)
            .resize(200)
            .toBuffer()
            .then(data => {
                // console.log("success!!! converting image: ");
                tagelerToSave.pictureSmall = data.toString('base64');
                tagelerToSave.save(callback);
            }
            )
            .catch(
            err => {
                // console.log("error");
                tagelerToSave.pictureSmall = tagelerToSave.picture;
                tagelerToSave.save(callback);
            }
            )
    } else {
        tagelerToSave.pictureSmall = tagelerToSave.picture;
        tagelerToSave.save(callback);
    }
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
    if (tagelerToUpdate.picture != null) {
        // console.log(tagelerToSave.picture)
        let img = Buffer.from(tagelerToUpdate.picture, 'base64');
        sharp(img)
            .resize(200)
            .toBuffer()
            .then(data => {
                // console.log("success!!! converting image: ");
                tagelerToUpdate.pictureSmall = data.toString('base64');
                Tageler.findOneAndUpdate({ _id: id }, tagelerToUpdate, { new: true, runValidators: true }, callback);
            }
            )
            .catch(
            err => {
                // console.log("error");
                tagelerToUpdate.pictureSmall = tagelerToSave.picture;
                Tageler.findOneAndUpdate({ _id: id }, tagelerToUpdate, { new: true, runValidators: true }, callback);
            }
            )
    } else {
        tagelerToUpdate.pictureSmall = tagelerToSave.picture;
        Tageler.findOneAndUpdate({ _id: id }, tagelerToUpdate, { new: true, runValidators: true }, callback);
    }
}