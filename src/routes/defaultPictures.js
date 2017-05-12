const express = require('express');
const router = express.Router();
const Picture = require('../models/defaultPicture');


/************* UNRESTRICTED *************/
// Get Picture by ID
router.get('/getById/:id', (req, res) => {
    let id = req.params.id;
    Picture.getOnePictureById(id, (err, picture) => {
        if (err) {
            res.json({success: false, msg: 'No Picture found with ID: ' + id, error: err});
        } else if (!picture){
            res.json({success: false, msg: 'No Picture found with ID: ' + id});
        } else {
            res.json(picture);
        }
    });
});
// Get one Picture by Name
router.get('/getByName/:name', (req, res) => {
    let name = req.params.name;
    Picture.getOnePictureByName(name, (err, picture) => {
        if (err) {
            res.json({success: false, msg: 'No Picture found with Name: ' + name, error: err});
        } else if (!picture){
            res.json({success: false, msg: 'No Picture found with Name: ' + name});
        } else {
            res.json(picture);
        }
    });
});

// Get Pictures by category
router.get('/getByCategory/:category', (req, res) => {
    let category = req.params.category;
    Picture.getPicturesByCategory(category, (err, pictures) => {
        if (err) {
            res.json({success: false, msg: 'No Pictures found for Category: ' + category, error: err});
        } else if (!pictures.length){
            res.json({success: false, msg: 'No Pictures found for Category: ' + category});
        } else {
            res.json(pictures);
        }
    });
});

// Get Pictures by group
router.get('/getByGroup/:group', (req, res) => {
    let group = req.params.group;
    Picture.getPicturesByCategory(group, (err, pictures) => {
        if (err) {
            res.json({success: false, msg: 'No Pictures found for Group: ' + group, error: err});
        } else if (!pictures.length){
            res.json({success: false, msg: 'No Pictures found for Group: ' + group});
        } else {
            res.json(pictures);
        }
    });
});

// Get all Pictures
router.get('/getPictures', (req, res) => {
    Picture.getAllPictures((err, allPictures) => {
        if (err) {
            res.json({success: false, msg: 'No Pictures found', error: err});
        } else if(!allPictures.length){
            res.json({success: false, msg: 'No Pictures found'});
        } else {
            res.json(allPictures);
        }
    });
});

/************* ADMIN *************/
// Save Picture
router.post('/admin/save', (req, res) => {
    let pictureToSave = new Picture({
        name: req.body.name,
        category: req.body.category,
        group: req.body.group,
        picture: req.body.picture
    });
    Picture.saveOnePicture(pictureToSave, (err, savedPicture) => {
        // code 11000 is duplicated key error (name is unique)
        if (err.code === 11000){
            res.json({success: false, msg: 'A Picture with the name ' + req.body.name + ' already exists'});
        }
        else if (err) {
            res.json({success: false, msg: 'Failed to save Picture ' + err});
        } else {
            res.json({success: true, msg: 'Picture saved', result: savedPicture});
        }
    });
});

// Update Picture by ID
router.put('/admin/update/:id', (req, res) => {
    let id = req.params.id;
    Picture.getOnePictureById(id, (err, pictureToUpdate) => {
        if (err) {
            res.json({success: false, msg: 'Failed to find the Picture with ID: ' + id, error: err});
        } else if(!pictureToUpdate) {
            res.json({success: false, msg: 'Failed to find the Picture with ID: ' + id});
        } else {
            let oldPicture = JSON.parse(JSON.stringify(pictureToUpdate));
            for (let param in req.body) {
                // should it be possible to clear unrequired fields ?
                //if (req.body[param] !== null && req.body[param] !== "")
                pictureToUpdate[param] = req.body[param];
            }
            Picture.updateOnePictureById(id, pictureToUpdate, (err, updatedPicture) => {
                if (err) {
                    res.json({success: false, msg: 'Failed to update Picture with ID: ' + id, error: err});
                } else {
                    res.json({success: true, msg: 'Picture updated', oldPicture: oldPicture, updatedPicture: updatedPicture});
                }
            });
        }
    });
});

// Update Picture by Name
router.put('/admin/update/:name', (req, res) => {
    let name = req.params.name;
    Picture.getOnePictureByName(name, (err, pictureToUpdate) => {
        if (err) {
            res.json({success: false, msg: 'Failed to find the Picture with Name: ' + name, error: err});
        } else if(!pictureToUpdate) {
            res.json({success: false, msg: 'Failed to find the Picture with Name: ' + name});
        } else {
            let oldPicture = JSON.parse(JSON.stringify(pictureToUpdate));
            for (let param in req.body) {
                // should it be possible to clear unrequired fields ?
                //if (req.body[param] !== null && req.body[param] !== "")
                pictureToUpdate[param] = req.body[param];
            }
            Picture.updateOnePictureByName(name, pictureToUpdate, (err, updatedPicture) => {
                if (err) {
                    res.json({success: false, msg: 'Failed to update Picture with Name: ' + name, error: err});
                } else {
                    res.json({success: true, msg: 'Picture updated', oldPicture: oldPicture, updatedPicture: updatedPicture});
                }
            });
        }
    });
});

// Delete Picture
router.delete('/admin/delete/:id', (req, res) => {
    let id = req.params.id;
    Picture.deleteOnePictureById(id, (err, deletedPicture) => {
        if (err) {
            res.json({success: false, msg: 'Failed to delete the Picture', error: err});
        } else if(!deletedPicture){
            res.json({success: false, msg: 'Failed to delete the Picture'});
        } else {
            res.json({success: true, msg: 'Picture deleted'});
        }
    });
});

module.exports = router;