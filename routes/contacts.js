const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');


const User = require('../models/users');
const Contact = require('../models/contacts');
// @route GET/api/contacts
// @desc GET contacts
// @access Private

router.get('/', auth, async (req, res) => {
    
    try {
        
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});


// @route Post/api/contacts
// @desc ADD  contacts
// @access Private

router.post('/', [auth, 
[
    body('name', 'Name is required')
    .not()
    .isEmpty(),

    body('email', 'Email is required')
    .isEmail()
]], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, name, phone, type} = req.body;

    try {
        
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();

        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route PUT/api/contacts
// @desc Update  contacts
// @access Private

router.put('/:id', auth,async (req, res) => {
    const {name, email, phone, type} =req.body;

    const contactField = {};

    if (name) contactField.name = name;
    if (email) contactField.email = email;
    if (phone) contactField.phone = phone;
    if (type) contactField.type = type;

    try {
        
        let contact = await Contact.findById(req.params.id);

        if(!contact) {
            return res.status(404).json({msg: "Contact not found"})
        }

        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Not Authorized"});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set: contactField},
            {new: true})
        
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


// @route Delete/api/contacts
// @desc Delete  contact
// @access Private

router.delete('/:id',auth, async (req, res) => {

    let contact = await Contact.findById(req.params.id);

    if(!contact) {
        return res.status(404).json({msg: "Contact not found"})
    }

    if(contact.user.toString() !== req.user.id) {
        return res.status(401).json({msg: "Not Authorized"});
    }

    try {
        await Contact.findByIdAndRemove(req.params.id);

        res.json({msg: "Contact Deleted"})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;