const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Tageler = require('../models/tageler');

// Create Tageler
router.post('/createtageler', (req, res, next) => {
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
            res.json({success: true, msg:'Tageler registered'});
        }
    });
});

router.get('/1234', (req, res, next) => {

    Tageler.getTagelersByUnit('1234', (err, tagelers) => {
        if(err){
            res.json({success: false, msg: 'No Tageler found'});
        } else{
            res.json(tagelers);
        }
    });
});


module.exports = router;