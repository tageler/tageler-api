const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Group = require('../models/group');
const appRoot = require('app-root-path');

// Multer Middleware
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/uploads/pictures/group_pictures')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage:storage});


// Get Group by ID
router.get('/getById/:id', (req, res, next) => {
    let id = req.params.id;
    Group.getGroupById(id, (err, groups) => {
        if(err){
            res.json({success: false, msg: 'No Group found with ID: '+id});
        } else{
            res.json(groups);
        }
    });
});

// Get all Groups
router.get('/getGroups', (req, res, next) => {
    Group.getGroups((err, groups) => {
        if(err){
            res.json({success: false, msg: 'No Groups were found'});
        } else{
            res.json(groups);
        }
    });
});

// Create group
router.post('/admin/create', upload.single('picture'), (req, res, next) => {
    console.log("blabl " + req.body.type);
    let newGroup = new Group({
        type: req.body.type,
        name: req.body.name
    });
    if (typeof req.file !== "undefined") {
        newGroup.picture = req.file.path;
    }
    Group.addGroup(newGroup, (err, group) => {
        if(err){
            console.log(newGroup);
            console.log(err);
            res.json({success: false, msg:'Failed to register Group '+err});
        } else {
            res.json({result:group, success: true, msg:'Group registered'});
        }
    });
});

// Update Group
router.put('/admin/update', (req, res, next) => {
    let updatedGroup = {
        type: req.body.type,
        name: req.body.name
    };
    Group.findOneAndUpdate(req.body._id, updatedGroup, (err, group) => {
        if (err) {
            console.log(err);
            res.json({success: false, msg:'Failed to update group'});
        } else {
            res.json({success: true, result:group, msg:'Group updated'});
        }
    });
});

// Delete Group
router.delete('/admin/delete', (req, res, next) => {
    let _id = req.body._id;
    Group.getGroupById(_id, (err, group) => {
       if(err || group == null) {
           res.json({success: false, msg: 'Failed to delete the Group'});
       } else {
           Group.remove(group, (err) => {
                if(err){
                    res.json({success: false, msg: 'Failed to delete the Group'});
                } else {
                    res.json({success: true, msg:'Group deleted'});
                }
            });
       }
    });
});

module.exports = router;