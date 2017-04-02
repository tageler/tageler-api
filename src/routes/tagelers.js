const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../config/database');
const Tageler = require('../models/tageler');
const appRoot = require('app-root-path');
const picture_downloader = require('./picture_downloader');
const upload = require('./picture_service');


// Multer Middleware
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './src/public/uploads/pictures/tageler_pictures')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// const upload = multer({storage:storage});



// Get Tagelers by group
router.get('/getByGroup/:group', (req, res, next) => {
    let group = req.params.group;
    Tageler.getTagelersByGroup(group, (err, tagelers) => {
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

// Get all Tagelers
router.get('/getTagelers', (req, res, next) => {
    Tageler.getTagelers((err, tagelers) => {
        if(err){
            res.json({success: false, msg: 'No Tagelers were found'});
        } else{
            res.json(tagelers);
        }
    });
});

//####### ADMIN ########

// Create Tageler
router.post('/admin/create', upload.single('picture'), (req, res, next) => {
    console.log("req: " +JSON.stringify(req.body));
    let newTageler = new Tageler({
        title: req.body.title,
        text: req.body.text,
        group: req.body.group,
        start: req.body.start,
        end: req.body.end,
        bring_along: req.body.bring_along,
        uniform: req.body.uniform,
        checkout: req.body.checkout
    });
    console.log("file: " +(req.file));
    if (typeof req.file !== "undefined") {
        newTageler.picture = req.file.path;
        console.log("file present");
    }else{
        newTageler.picture = req.body.picture;
        //does not work right now...
        // console.log("picUrl: " +newTageler.picture);
        // var fName ='./public/uploads/pictures/tageler_pictures/' + "url_picture" + '-' + Date.now()+".jpg"
        // picture_downloader(newTageler.picture,fName);
        // newTageler.picture =  fName;
    }    
    Tageler.addTageler(newTageler, (err, tageler) => {
        if(err){
            console.log(err);
            res.json({success: false, msg:'Failed to register Tageler'});
        } else {
            res.json({result:tageler, success: true, msg:'Tageler registered'});
        }
    });
});

// Update Tageler
router.put('/admin/update', upload.single('picture'), (req, res, next) => {
    let id = req.body.id;
    Tageler.findOne({_id: id}, (err, tagelerToUpdate) => {
        if (err || tagelerToUpdate == null) {
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
                if (err || tageler == null) {
                    res.json({
                        success: false,
                        msg: 'Failed to update Tageler with ID: ' + id,
                        foundTageler: tageler,
                        error: err
                    });
                } else {
                    res.json({
                        success: true,
                        // TODO change from result to updatedTageler, for consistency in naming conventions
                        result: tageler,
                        updatedTageler: tagelerToUpdate,
                        msg: 'Tageler updated'
                    });
                }
            });
        }
    });
});

// Delete Tageler
router.delete('/admin/delete', (req, res, next) => {
    let _id_param = req.param("_id"); 
    let _id = req.body._id;
    if (typeof _id == 'undefined')
        _id = _id_param;

    console.log("delete: " + _id);
    Tageler.getTagelerById(_id, (err, tageler) => {

       if(err || tageler == null) {
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