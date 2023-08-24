const express = require("express");
const Joi = require("joi");

const contactsAPI = require("../../models/contacts");
const router = express.Router();
const { HttpError } = require("../../utils");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsAPI.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contactsAPI.getContactById(id);

    if (!result) {
      throw HttpError(404, "Contact not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsAPI.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contactsAPI.removeContact(id);

    if (!result) {
      throw HttpError(404, "Contact not found");
    }

    res.status(200).json("Contact deleted");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.body?.name && !req.body?.email && !req.body?.phone) {
      throw HttpError(400, "Missing fields");
    }

    const result = await contactsAPI.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
