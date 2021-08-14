const modelRouter = require("express").Router();
const {
  getAllModels,
  getOneModel,
  getOneModelOutfits,
  addOneModel,
  updateOneModel,
  deleteOneModel,
} = require("./controller");
modelRouter.get("/", getAllModels);
modelRouter.get("/:id", getOneModel);
modelRouter.get("/:id/outfits", getOneModelOutfits);
modelRouter.post("/", addOneModel);
modelRouter.patch("/:id", updateOneModel);
modelRouter.delete("/:id", deleteOneModel);

module.exports = modelRouter;
// - models/:id/outfits which returns the outfits this model presented
