const { contactController } = require("../controllers/contact.controller");

const contactRouter = require("express").Router();

contactRouter.post("/", contactController);

module.exports = contactRouter;
