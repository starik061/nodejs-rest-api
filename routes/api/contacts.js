const express = require("express");
const contactsAPI = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");

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
      const error = new Error("Contact not found");
      error.status = 404;
      throw error;
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
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }

    const result = await contactsAPI.addContact(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contactsAPI.removeContact(id);

    if (!result) {
      const error = new Error("Contact not found");
      error.status = 404;
      throw error;
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
      const error = new Error("Missing fields");
      error.status = 400;
      throw error;
    }

    const result = await contactsAPI.updateContact(id, req.body);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
