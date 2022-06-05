const { contacts } = require('../services');
const { schemaCreate, schemaPatch } = require('../models/contacts');

const listContacts = async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
    res.json(all);
  } catch (error) {
    next(error);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contacts.getContactById(id);
    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schemaCreate.validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
    }

    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};
const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await contacts.removeContact(id);
    if (!deletedContact) {
      throw createError(404, 'Not found');
    }
    // res.status(204).json({ message: 'contact deleted' });
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};
const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const updateContact = await contacts.updateContact(id, req.body);
    if (!updateContact) {
      res.status(404).json('not found');
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { error } = schemaPatch.validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
    }

    const favoriteContact = await contacts.updateContact(id, req.body);
    if (!favoriteContact) {
      res.status(400).json('missing field favorite');
    }
    res.json(favoriteContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
//
