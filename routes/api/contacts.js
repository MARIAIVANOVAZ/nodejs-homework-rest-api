const express = require('express');
const contacts = require('../../controllers/index');
const router = express.Router();
const { auth } = require('../../middlewares/authenticate');

router.get('/', auth, contacts.listContacts);

router.get('/:contactId', auth, contacts.getContactById);

router.post('/', auth, contacts.addContact);

router.delete('/:contactId', auth, contacts.removeContact);

router.put('/:contactId', auth, contacts.updateContact);

router.patch('/:contactId/favorite', auth, contacts.updateStatusContact);

module.exports = router;
