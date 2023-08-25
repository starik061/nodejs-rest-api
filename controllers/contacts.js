const contactsAPI = require("../models/contacts.js");
const { HttpError } = require("../utils");
const { ctrlWrapper } = require("../utils");

const getAll = async (req, res) => {
  const result = await contactsAPI.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await contactsAPI.getContactById(id);

  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await contactsAPI.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const result = await contactsAPI.removeContact(id);

  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  res.json("Contact deleted"); // status(204) but with this status there will be no message shown
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const result = await contactsAPI.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
