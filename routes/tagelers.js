const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Tageler = require('../models/tageler');


// Get Tagelers by Unit
router.get('/getByUnit/:unit', (req, res, next) => {

    let unit = req.params.unit;
    Tageler.getTagelersByUnit(unit, (err, tagelers) => {
        if(err){
            res.json({success: false, msg: 'No Tageler found'});
        } else{
            res.json(tagelers);
        }
    });
});

// Get Tagelers by ID
router.get('/getById/:id', (req, res, next) => {
    let id = req.params.id;

    Tageler.getTagelerById(id, (err, tagelers) => {
        if(err){
            res.json({success: false, msg: 'No Tageler found with ID: '+id});
        } else{
            res.json(tagelers);
        }
    });
});

//####### ADMIN ########

// Create Tageler
router.post('/admin/create', (req, res, next) => {
    let newTageler = new Tageler({
        title: req.body.title,
        unit: req.body.unit,
        start: req.body.start,
        end: req.body.end,
        bring_along: req.body.bring_along,
        uniform: req.body.uniform,
        picture: req.body.picture,
        checkout_deadline: req.body.checkout_deadline
    });

    Tageler.addTageler(newTageler, (err, tageler) => {
        if(err){
            console.log(newTageler);
            console.log(err);
            res.json({success: false, msg:'Failed to register Tageler'});
        } else {
            res.json({result:tageler, success: true, msg:'Tageler registered'});
        }
    });
});

// Update Tageler
router.post('/admin/update', (req, res, next) => {
    let updatedTageler = {
        title: req.body.title,
        unit: req.body.unit,
        start: req.body.start,
        end: req.body.end,
        bring_along: req.body.bring_along,
        uniform: req.body.uniform,
        picture: req.body.picture,
        checkout_deadline: req.body.checkout_deadline
    };
    Tageler.findOneAndUpdate(req.body._id, updatedTageler, (err, tageler) => {
        if (err) {
            console.log(err);
            res.json({success: false, msg:'Failed to update Tageler'});
        } else {
            res.json({success: true, result:tageler, msg:'Tageler registered'});
        }
    });
});

// Delete Tageler
router.post('/admin/delete', (req, res, next) => {
    let _id = req.body._id;
    Tageler.getTagelerById(_id, (err, tageler) => {
       if(err) {
           res.json({success: false, msg: 'Failed to delete the Tageler'});
       } else {
           Tageler.remove(tageler, (err) => {
               if(err){
                   res.json({success: false, msg: 'Failed to delete the Tageler'});
               } else {
                   res.json({success: true, msg:'Tageler deleted'});
               }
           });
       }
    });
});

module.exports = router;