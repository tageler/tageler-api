const express = require('express');
const router = express.Router();

// Index
router.get('/', (req, res, next) => {
    res.json('The game is on!');
});

module.exports = router;