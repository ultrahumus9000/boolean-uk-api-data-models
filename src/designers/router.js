const designerRouter = require("express").Router();

const {
  getAllDesigners,
  getOneDesigner,
  postOneDesigner,
  updateDesigner,
  deleteDesigner,
} = require("./controller");

designerRouter.get("/", getAllDesigners);
designerRouter.get("/:id", getOneDesigner);
designerRouter.post("/", postOneDesigner);
designerRouter.patch("/:id", updateDesigner);
designerRouter.delete("/:id", deleteDesigner);

module.exports = designerRouter;
