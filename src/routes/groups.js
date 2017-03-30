const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Tageler = require('../models/group');
const appRoot = require('app-root-path');


// Get Group by ID
router.get('/getById/:id', (req, res, next) => {
    let id = req.params.id;
    Group.getGroupById(id, (err, tagelers) => {
        if(err){
            res.json({success: false, msg: 'No Group found with ID: '+id});
        } else{
            res.json(tagelers);
        }
    });
});

// Get all Tagelers
router.get('/getGroups', (req, res, next) => {
    Tageler.getGroups((err, tagelers) => {
        if(err){
            res.json({success: false, msg: 'No Groups were found'});
        } else{
            res.json(tagelers);
        }
    });
});

//####### ADMIN ########

// Create Tageler
router.post('/admin/create', upload.single('picture'), (req, res, next) => {
    console.log(req.file);
    let newTageler = new Tageler({
        title: req.body.title,
        text: req.body.text,
        group: req.body.group,
        start: req.body.start,
        end: req.body.end,
        bring_along: req.body.bring_along,
        uniform: req.body.uniform,
        picture: req.file.path,
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
router.put('/admin/update', (req, res, next) => {
    let updatedTageler = {
        title: req.body.title,
        text: req.body.text,
        group: req.body.group,
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
            res.json({success: true, result:tageler, msg:'Tageler updated'});
        }
    });
});

// Delete Tageler
router.delete('/admin/delete', (req, res, next) => {
    let _id = req.body._id;

    Tageler.getTagelerById(_id, (err, tageler) => {
       if(err) {
           res.json({success: false, msg: 'Failed to delete the Tageler'});
       } else {
           fs.unlink(appRoot + tageler.picture, (err) => {
               if(err) throw err;
               Tageler.remove(tageler, (err) => {
                   if(err){
                       res.json({success: false, msg: 'Failed to delete the Tageler'});
                   } else {
                       res.json({success: true, msg:'Tageler deleted'});
                   }
               });
           });
       }
    });
});


module.exports = router;