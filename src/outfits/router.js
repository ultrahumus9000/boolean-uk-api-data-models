const outfitRouter = require("express").Router();

const {
  getAllOutfits,
  getOneOutfit,
  addOneOutfit,
  updateOneOutfit,
  deleteOneOutfit,
} = require("./controller");

outfitRouter.get("/", getAllOutfits);
outfitRouter.get("/:id", getOneOutfit);
outfitRouter.post("/", addOneOutfit);
outfitRouter.patch("/:id", updateOneOutfit);
outfitRouter.delete("/:id", deleteOneOutfit);

module.exports = outfitRouter;
