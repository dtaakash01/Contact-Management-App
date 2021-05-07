const express = require('express');
const router = express.Router();


// @route GET/api/auth
// @desc Register user
// @access Private

router.get('/', (req, res) => {
    res.send("Get logged in user")
});


// @route POST/api/auth
// @desc Register user
// @access Private

router.post('/', (req, res) => {
    res.send("Post user")
});


module.exports = router;