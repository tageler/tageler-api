const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Tageler = require('../models/tageler');


/************* UNRESTRICTED *************/
// Get Tagelers by group
router.get('/getByGroup/:group', (req, res) => {
    let group = req.params.group;
    Tageler.getTagelersByGroup(group, (err, tagelers) => {
        if (err) {
            res.json({success: false, msg: 'mongoose error while finding tagelers'});
        } else {
            if(tagelers === undefined || tagelers.length === 0){
                res.json({success: false, msg: 'No Tagelers found'});
            } else{
                res.json(tagelers);
            }
        }
    });
});

// Get Tagelers by ID
router.get('/getById/:id', (req, res) => {
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
router.get('/getTagelers', (req, res) => {
    Tageler.getTagelers((err, tagelers) => {
        if (err) {
            res.json({success: false, msg: 'mongoose error while finding tagelers'});
        } else {
            if(tagelers === undefined || tagelers.length === 0){
                res.json({success: false, msg: 'No Tagelers found'});
            } else{
                res.json(tagelers);
            }
        }
    });
});

/************* ADMIN *************/
// Create Tageler
router.post('/admin/create', (req, res) => {
    // console.log('req: ' + JSON.stringify(req.body));
    let newTageler = new Tageler({
        title: req.body.title,
        text: req.body.text,
        group: req.body.group,
        start: req.body.start,
        end: req.body.end,
        bringAlong: req.body.bringAlong,
        uniform: req.body.uniform,
        picture: req.body.picture,
        checkout: req.body.checkout,
        free: req.body.free
    });
    Tageler.addTageler(newTageler, (err, tageler) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register Tageler', error: err});
        } else {
            res.json({result: tageler, success: true, msg: 'Tageler registered'});
        }
    });
});

// Update Tageler
router.put('/admin/update/:id', (req, res) => {
    let id = req.params.id;
    Tageler.findOne({_id: id}, (err, tagelerToUpdate) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to find the Tageler with ID: ' + id,
                foundTageler: tagelerToUpdate,
                error: err
            });
        } else {
            let oldTageler = JSON.parse(JSON.stringify(tagelerToUpdate));
            for (let param in req.body) {
                if (req.body[param] !== null && req.body[param] !== "") {
                    tagelerToUpdate[param] = req.body[param];
                }
            }
            Tageler.findOneAndUpdate({_id: id}, tagelerToUpdate, {new: true, runValidators: true}, (err, updatedTageler) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to update Tageler with ID: ' + id,
                        foundTageler: updatedTageler,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        oldTageler: oldTageler,
                        updatedTageler: updatedTageler,
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

        if (err) {
            res.json({success: false, msg: 'Failed to delete the Tageler, tageler is null'});
        } else {
            Tageler.remove(tagelerToDelete, (err) => {
                if (err) {
                    res.json({success: false, msg: 'mongoose error while deleting the tageler'});
                } else {
                    res.json({success: true, msg: 'Tageler deleted'});
                }
            });
        }
    });
});

module.exports = router;