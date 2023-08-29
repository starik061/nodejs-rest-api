const express = require("express");

const ctrl = require("../../controllers/contacts.js");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact.js");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.contactSchema), ctrl.add);

router.delete("/:id", isValidId, ctrl.deleteById);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactSchema),
  ctrl.updateById
);
// TODO patch route
// router.patch(
//   "/:id",
//   isValidId,
//   validateBody(schemas.contactSchema),
//   ctrl.updateById
// );

module.exports = router;
