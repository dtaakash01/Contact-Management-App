const express = require('express');
const router = express.Router();


// @route GET/api/contacts
// @desc GET contacts
// @access Private

router.get('/', (req, res) => {
    res.send("GEt contacts")
});


// @route Post/api/contacts
// @desc ADD  contacts
// @access Private

router.post('/', (req, res) => {
    res.send("Add a contact")
});


// @route PUT/api/contacts
// @desc Update  contacts
// @access Private

router.put('/:id', (req, res) => {
    res.send("Update contact")
});


// @route Delete/api/contacts
// @desc Delete  contact
// @access Private

router.delete('/:id', (req, res) => {
    res.send("Delete contact")
});


module.exports = router;