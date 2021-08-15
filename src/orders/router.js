const orderRouter = require("express").Router();

const {
  getAllOrders,
  getOneOrder,
  addOneOrder,
  updateOneOrder,
  deleteOneOrder,
} = require("./controller");

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOneOrder);
orderRouter.post("/", addOneOrder);
orderRouter.patch("/:id", updateOneOrder);
orderRouter.delete("/:id", deleteOneOrder);

module.exports = orderRouter;
