const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');



const User = require('../models/users');
const { JsonWebTokenError } = require('jsonwebtoken');

// @route post/api/users
// @desc Register user
// @access public

router.post('/',[
    body('name', 'Name is Required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters')
    .isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  

    const {name, email, password} = req.body;

    try {
        
        let user = await User.findOne({ email});
        console.log(user);

        if(user) {
           return res.status(400).json({msg: 'User already exits'});
        }

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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

        console.log(error.message);
        res.status(500).send('Server Error');

    }
});


module.exports = router;