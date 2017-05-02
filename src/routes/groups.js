const express = require('express');
const router = express.Router();
const Group = require('../models/group');


/************* UNRESTRICTED *************/
// Get Group by ID
router.get('/getById/:id', (req, res) => {
    let id = req.params.id;
    Group.getOneGroupById(id, (err, group) => {
        if (err) {
            res.json({success: false, msg: 'No Group found with ID: ' + id, error: err});
        } else if (!group){
            res.json({success: false, msg: 'No Group found with ID: ' + id});
        } else {
            res.json(group);
        }
    });
});

// Get all Groups
router.get('/getGroups', (req, res) => {
    Group.getAllGroups((err, allGroups) => {
        if (err) {
            res.json({success: false, msg: 'No Groups found', error: err});
        } else if(!allGroups.length){
            res.json({success: false, msg: 'No Groups found'});
        } else {
            res.json(allGroups);
        }
    });
});

/************* ADMIN *************/
// Create group
router.post('/admin/create', (req, res) => {
    let groupToSave = new Group({
        type: req.body.type,
        name: req.body.name,
        picture: req.body.picture
    });
    Group.saveOneGroup(groupToSave, (err, savedGroup) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register Group ' + err});
        } else {
            res.json({success: true, msg: 'Group registered', result: savedGroup});
        }
    });
});

// Update Group
router.put('/admin/update/:id', (req, res) => {
    let id = req.params.id;
    Group.getOneGroupById(id, (err, groupToUpdate) => {
        if (err) {
            res.json({success: false, msg: 'Failed to find the Group with ID: ' + id, error: err});
        } else if(!groupToUpdate) {
            res.json({success: false, msg: 'Failed to find the Group with ID: ' + id});
        } else {
            let oldGroup = JSON.parse(JSON.stringify(groupToUpdate));
            for (let param in req.body) {
                // should it be possible to clear unrequired fields ?
                //if (req.body[param] !== null && req.body[param] !== "")
                    groupToUpdate[param] = req.body[param];
            }
            Group.updateOneGroupById(id, groupToUpdate, (err, updatedGroup) => {
                if (err) {
                    res.json({success: false, msg: 'Failed to update Group with ID: ' + id, error: err});
                } else {
                    // should we send full groups ? (maybe without picture?)
                    res.json({success: true, msg: 'Group updated', oldGroup: oldGroup, updatedGroup: updatedGroup});
                }
            });
        }
    });
});

// Delete Group
router.delete('/admin/delete/:id', (req, res) => {
    let id = req.params.id;
    Group.deleteOneGroupById(id, (err, deletedGroup) => {
        if (err) {
            res.json({success: false, msg: 'Failed to delete the Group', error: err});
        } else if(!deletedGroup){
            res.json({success: false, msg: 'Failed to delete the Group'});
        } else {
            res.json({success: true, msg: 'Group deleted'});
        }
    });
});

module.exports = router;