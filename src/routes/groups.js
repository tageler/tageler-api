const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Group = require('../models/group');

// Multer Middleware
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/uploads/pictures/group_pictures')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage});

/************* UNRESTRICTED *************/
// Get Group by ID
router.get('/getById/:id', (req, res, next) => {
    let id = req.params.id;
    Group.getGroupById(id, (err, groups) => {
        if (err) {
            res.json({success: false, msg: 'No Group found with ID: ' + id});
        } else {
            res.json(groups);
        }
    });
});

// Get all Groups
router.get('/getGroups', (req, res, next) => {
    Group.getGroups((err, groups) => {
        if (err) {
            res.json({success: false, msg: 'No Groups were found'});
        } else {
            res.json(groups);
        }
    });
});

/************* ADMIN *************/
// Create group
router.post('/admin/create', upload.single('picture'), (req, res, next) => {
    let newGroup = new Group({
        type: req.body.type,
        name: req.body.name
    });
    if (typeof req.file !== 'undefined') {
        newGroup.picture = req.file.path;
    }
    Group.addGroup(newGroup, (err, group) => {
        if (err) {
            console.log(err);
            res.json({success: false, msg: 'Failed to register Group ' + err});
        } else {
            res.json({result: group, success: true, msg: 'Group registered'});
        }
    });
});

// Update Group
router.put('/admin/update', (req, res, next) => {
    let id = req.body.id;
    Group.findOne({_id: id}, (err, groupToUpdate) => {
        if (err || groupToUpdate === null) {
            res.json({
                success: false,
                msg: 'Failed to find the Group with ID: ' + id,
                foundGroup: groupToUpdate,
                error: err
            });
        } else {
            for (let param in req.body) {
                groupToUpdate[param] = req.body[param];
            }
            Group.findOneAndUpdate({_id: id}, groupToUpdate, (err, group) => {
                if (err || group === null) {
                    res.json({
                        success: false,
                        msg: 'Failed to update Group with ID: ' + id,
                        foundGroup: group,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        oldGroup: group,
                        updatedGroup: groupToUpdate,
                        msg: 'Group updated'
                    });
                }
            });
        }
    });
});

// Delete Group
router.delete('/admin/delete', (req, res, next) => {
    let id = req.body._id;
    Group.getGroupById(id, (err, group) => {
        if (err || group === null) {
            res.json({success: false, msg: 'Failed to delete the Group'});
        } else {
            Group.remove(group, (err) => {
                if (err) {
                    res.json({success: false, msg: 'Failed to delete the Group'});
                } else {
                    res.json({success: true, msg: 'Group deleted'});
                }
            });
        }
    });
});

module.exports = router;