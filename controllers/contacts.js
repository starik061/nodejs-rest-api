const { Contact } = require("../models/contact");
const { HttpError } = require("../utils");
const { ctrlWrapper } = require("../utils");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findOne({ _id: id }); // or we can use findById if will find by id

  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  res.json("Contact deleted"); // status(204) but with this status there will be no message shown
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }); // findByIdAndUpdate return old object, that is why we need { new: true }
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
