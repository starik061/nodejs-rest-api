const express = require("express");

const ctrl = require("../../controllers/contacts.js");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts.js");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.contactSchema), ctrl.add);

router.delete("/:id", ctrl.deleteById);

router.put("/:id", validateBody(schemas.contactSchema), ctrl.updateById);

module.exports = router;
