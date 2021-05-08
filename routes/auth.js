const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


const User = require('../models/users')

// @route GET/api/auth
// @desc Register user
// @access Private

router.get('/', (req, res) => {
    res.send("Get logged in user")
});


// @route POST/api/auth
// @desc Register user
// @access Private

router.post('/',[
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const payload = ({
            user: {
                id: user.id
            }
        });

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, 
        (err, token) => {
            if(err) throw err;
            res.json({token});
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;