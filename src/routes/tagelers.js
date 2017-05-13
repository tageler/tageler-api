const express = require('express');
const router = express.Router();
const Tageler = require('../models/tageler');
const ical = require('ical-generator');
const iCalService = require('../services/iCalService');


/************* UNRESTRICTED *************/
// Get Tagelers by group
router.get('/getByGroup/:group', (req, res) => {
    let group = req.params.group;
    Tageler.getTagelersByGroup(group, (err, tagelers) => {
        if (err) {
            res.json({success: false, msg: 'No Tagelers found for Group: ' + group, error: err});
        } else if(!tagelers.length) {
            res.json({success: false, msg: 'No Tagelers found for Group: ' + group});
        } else{
            res.json(tagelers);
        }
    });
});


// Get Tagelers by ID
router.get('/getById/:id', (req, res) => {
    let id = req.params.id;
    Tageler.getOneTagelerById(id, (err, tageler) => {
        if (err) {
            res.json({success: false, msg: 'No Tageler found with ID: ' + id, error: err});
        } else if(!tageler) {
            res.json({success: false, msg: 'No Tageler found with ID: ' + id});
        } else {
            res.json(tageler);
        }
    });
});

// Get all Tagelers
router.get('/getTagelers', (req, res) => {
    Tageler.getAllTagelers((err, allTagelers) => {
        if (err) {
            res.json({success: false, msg: 'No Tagelers found', error: err});
        } else if(!allTagelers.length) {
            res.json({success: false, msg: 'No Tagelers found'});
        } else{
            res.json(allTagelers);
        }
    });
});

/************* iCal *************/
// Get iCal for one Tageler, service handles the response
/*router.get('/calForTageler/:id', (req, res) => {
    let id = req.params.id;
    Tageler.getOneTagelerById(id,(err, tageler) => {
        if(err){
            res.json({success: false, msg: 'No Tageler found with ID: ' + id, error: err});
        } else if (!tageler){
            res.json({success: false, msg: 'No Tageler found with ID: ' + id});
        } else {
            iCalService.createAndSendTagelerICal(tageler, res);
        }
    });
});
*/

// Alternative to handle the response here
router.get('/calForTageler/:id', (req, res) => {
    let id = req.params.id;
    Tageler.getOneTagelerById(id,(err, tageler) => {
        if(err){
            res.json({success: false, msg: 'No Tageler found with ID: ' + id, error: err});
        } else if (!tageler){
            res.json({success: false, msg: 'No Tageler found with ID: ' + id});
        } else {
            iCalService.createTagelerICal(tageler, (err, cal) => {
                if(err){
                    res.json({success: false, error: err});
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/calendar; charset=utf-8',
                        'Content-Disposition': 'attachment; filename="' + tageler.title +'.ics'+ '"'
                    });
                    res.end(cal);
                }
            });
        }
    });
});

// Get iCal for all Tagelers of a group
router.get('/calForGroup/:group', (req, res) => {
    let group = req.params.group;
    Tageler.getTagelersByGroup(group, (err, tagelers) => {
        if (err) {
            res.json({success: false, msg: 'No Tagelers found for Group: ' + group, error: err});
        } else if (!tagelers.length) {
            res.json({success: false, msg: 'No Tagelers found for Group: ' + group});
        } else {
            iCalService.createGroupICal(group, tagelers, (err, cal) => {
                if (err) {
                    res.json({success: false, error: err});
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/calendar; charset=utf-8',
                        'Content-Disposition': 'attachment; filename="' + group +'Tageler.ics' + '"'
                    });
                    res.end(cal);
                }
            });
        }
    });
});


/************* ADMIN *************/
// Create Tageler
router.post('/admin/create', (req, res) => {
    // console.log('req: ' + JSON.stringify(req.body));
    let tagelerToSave = new Tageler({
        title: req.body.title,
        text: req.body.text,
        group: req.body.group,
        start: req.body.start,
        end: req.body.end,
        bringAlong: req.body.bringAlong,
        uniform: req.body.uniform,
        picture: req.body.picture,
        checkout: req.body.checkout,
        free: req.body.free,
        background_color: req.body.background_color,
        color: req.body.color,
        font_family: req.body.font_family

    });
    Tageler.saveOneTageler(tagelerToSave, (err, savedTageler) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register Tageler', error: err});
        } else {
            // should we send the full tageler as result ? (maybe without picture ?)
            res.json({success: true, msg: 'Tageler registered', result: savedTageler});
        }
    });
});

// Update Tageler
router.put('/admin/update/:id', (req, res) => {
    let id = req.params.id;
    Tageler.getOneTagelerById(id, (err, tagelerToUpdate) => {
        if (err) {
            res.json({success: false, msg: 'Failed to find the Tageler with ID: ' + id, error: err});
        } else if(!tagelerToUpdate){
            res.json({success: false, msg: 'Failed to find the Tageler with ID: ' + id});
        } else {
            let oldTageler = JSON.parse(JSON.stringify(tagelerToUpdate));
            for (let param in req.body) {
                // should it be possible to clear unrequired fields ?
                //if (req.body[param] !== null && req.body[param] !== "")
                    tagelerToUpdate[param] = req.body[param];
            }
            Tageler.updateOneTagelerById(id, tagelerToUpdate, (err, updatedTageler) => {
                if (err) {
                    res.json({success: false, msg: 'Failed to update Tageler with ID: ' + id});
                } else {
                    // should we send the full tagelers ? (maybe without picture ?)
                    res.json({success: true, msg: 'Tageler updated', oldTageler: oldTageler, updatedTageler: updatedTageler});
                }
            });
        }
    });
});

// Delete Tageler
router.delete('/admin/delete/:id', (req, res) => {
    let id = req.params.id;
    Tageler.deleteOneTagelerById(id, (err,deletedTageler) => {
        if (err) {
            res.json({success: false, msg: 'Failed to delete Tageler with ID: ' + id, error: err});
        } else if(!deletedTageler){
            res.json({success: false, msg: 'Failed to delete Tageler with ID: ' + id});
        } else {
            res.json({success: true, msg: 'Tageler deleted', deletedTageler: deletedTageler});
        }
    });
});

module.exports = router;