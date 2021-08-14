const guestRouter = require("express").Router();
const {
  getAllGuests,
  getOneGuest,
  getOneGuestOrders,
  getOneGuestTotalSpent,
  postOneGuest,
  updateOneGuest,
  deleteOneGuest,
} = require("./controller");
guestRouter.get("/", getAllGuests);
guestRouter.get("/:id", getOneGuest);
guestRouter.get("/:id/purchases", getOneGuestOrders);
guestRouter.get("/:id/total-spent", getOneGuestTotalSpent);

guestRouter.post("/", postOneGuest);
guestRouter.patch("/:id", updateOneGuest);
guestRouter.delete("/:id", deleteOneGuest);

module.exports = guestRouter;
