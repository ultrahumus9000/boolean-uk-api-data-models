const { event } = require("../database");
const { errorHandler, getRamdomInt, checker } = require("../../helper");
const eventRouter = require("express").Router();

const {
  getAllEvents,
  getOneEvent,
  getThemeModels,
  getThemeDesigners,
  getThemeGuests,
  addOneEvent,
  updateOneEvent,
  deleteOneEvent,
} = require("./controller");

eventRouter.get("/", getAllEvents);
eventRouter.get("/event/:id", getOneEvent);
eventRouter.get("/:theme/models", getThemeModels);
eventRouter.get("/:theme/designers", getThemeDesigners);
eventRouter.get("/:theme/guests", getThemeGuests);
eventRouter.post("/", addOneEvent);
eventRouter.patch("/:id", updateOneEvent);
eventRouter.delete("/:id", deleteOneEvent);

module.exports = eventRouter;

// - events/:event-name/models which returns the models for an event with a specific name
// - events/:event-name/designers which returns the designers whose outfits will be shown at the event with a specific name

// - events/:event-name/guests which returns the designers whose outfits will be shown at the event with a specific name
