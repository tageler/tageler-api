const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../config/database');
const Tageler = require('../models/tageler');
const upload = require('./picture_service');

/************* UNRESTRICTED *************/
// Get Tagelers by group
router.get('/getByGroup/:group', (req, res, next) => {
    let group = req.params.group;
    Tageler.getTagelersByGroup(group, (err, tagelers) => {
        if (err) {
            res.json({success: false, msg: 'No Tageler found'});
        } else {
            res.json(tagelers);
        }
    });
});

// Get Tagelers by ID
router.get('/getById/:id', (req, res, next) => {
    let id = req.params.id;
    Tageler.getTagelerById(id, (err, tagelers) => {
        if (err) {
            res.json({success: false, msg: 'No Tageler found with ID: ' + id});
        } else {
            res.json(tagelers);
        }
    });
});

// Get all Tagelers
router.get('/getTagelers', (req, res, next) => {
    Tageler.getTagelers((err, tagelers) => {
        if (err) {
            res.json({success: false, msg: 'No Tagelers were found'});
        } else {
            res.json(tagelers);
        }
    });
});

/************* ADMIN *************/
// Create Tageler
router.post('/admin/create', upload.single('picture'), (req, res, next) => {
    // console.log('req: ' + JSON.stringify(req.body));
    let newTageler = new Tageler({
        title: req.body.title,
        text: req.body.text,
        group: req.body.group,
        start: req.body.start,
        end: req.body.end,
        bringAlong: req.body.bringAlong,
        uniform: req.body.uniform,
        checkout: req.body.checkout,
        free: req.body.free
    });
    // console.log('file: ' + (req.file));
    if (typeof req.file === 'undefined') {
        newTageler.picture = req.body.picture;
        // TODO does not work right now...
        // console.log("picUrl: " +newTageler.picture);
        // var fName ='./public/uploads/pictures/tageler_pictures/' + "url_picture" + '-' + Date.now()+".jpg"
        // pictureDownloader(newTageler.picture,fName);
        // newTageler.picture =  fName;
    } else {
        newTageler.picture = req.file.path;
        console.log('file present');
    }
    Tageler.addTageler(newTageler, (err, tageler) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register Tageler', error: err});
        } else {
            res.json({result: tageler, success: true, msg: 'Tageler registered'});
        }
    });
});

// Update Tageler
router.put('/admin/update/:id', upload.single('picture'), (req, res, next) => {
    let id = req.params.id;
    Tageler.findOne({_id: id}, (err, tagelerToUpdate) => {
        if (err || tagelerToUpdate === null) {
            res.json({
                success: false,
                msg: 'Failed to find the Tageler with ID: ' + id,
                foundTageler: tagelerToUpdate,
                error: err
            });
        } else {
            for (let param in req.body) {
                tagelerToUpdate[param] = req.body[param];
            }
            Tageler.findOneAndUpdate({_id: id}, tagelerToUpdate, (err, tageler) => {
                if (err || tageler === null) {
                    res.json({
                        success: false,
                        msg: 'Failed to update Tageler with ID: ' + id,
                        foundTageler: tageler,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        oldTageler: tageler,
                        updatedTageler: tagelerToUpdate,
                        msg: 'Tageler updated'
                    });
                }
            });
        }
    });
});

// Delete Tageler
router.delete('/admin/delete/:id', (req, res) => {
    let id = req.params.id;
    Tageler.findById({_id: id}, (err, tagelerToDelete) => {

        if (err || tagelerToDelete === null) {
            res.json({success: false, msg: 'Failed to delete the Tageler, tageler is null'});
        } else {
            Tageler.remove(tagelerToDelete, (err) => {
                if (err) {
                    res.json({success: false, msg: 'Failed to delete the Tageler'});
                } else {
                    res.json({success: true, msg: 'Tageler deleted'});
                }
            });
        }
    });
});

module.exports = router;