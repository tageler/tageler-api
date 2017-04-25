const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Group = require('../models/group');


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
router.post('/admin/create', (req, res, next) => {
    let newGroup = new Group({
        type: req.body.type,
        name: req.body.name,
        picture: req.body.picture
    });
    Group.addGroup(newGroup, (err, group) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register Group ' + err});
        } else {
            res.json({result: group, success: true, msg: 'Group registered'});
        }
    });
});

// Update Group
router.put('/admin/update/:id', (req, res, next) => {
    let id = req.params.id;
    Group.findOne({_id: id}, (err, groupToUpdate) => {
        if (err || groupToUpdate === null) {
            res.json({
                success: false,
                msg: 'Failed to find the Group with ID: ' + id,
                foundGroup: groupToUpdate,
                error: err
            });
        } else {
            let oldGroup = JSON.parse(JSON.stringify(groupToUpdate));
            for (let param in req.body) {
                if(req.body[param]){
                    groupToUpdate[param] = req.body[param];
                }
            }
            Group.findOneAndUpdate({_id: id}, groupToUpdate, {new: true}, (err, updatedGroup) => {
                if (err || updatedGroup === null) {
                    res.json({
                        success: false,
                        msg: 'Failed to update Group with ID: ' + id,
                        foundGroup: updatedGroup,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        oldGroup: oldGroup,
                        updatedGroup: updatedGroup,
                        msg: 'Group updated'
                    });
                }
            });
        }
    });
});

// Delete Group
router.delete('/admin/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Group.getGroupById({_id: id}, (err, groupToDelete) => {
        if (err || groupToDelete === null) {
            res.json({success: false, msg: 'Failed to delete the Group'});
        } else {
            Group.remove(groupToDelete, (err) => {
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