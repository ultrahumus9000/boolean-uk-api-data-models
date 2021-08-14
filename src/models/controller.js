const { event, model } = require("../database");
const { errorHandler, getRamdomInt, checker } = require("../../helper");

async function getAllModels(req, res) {
  try {
    const result = await model.findMany({
      include: {
        outfits: true,
      },
    });
    res.json(result);
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function getOneModel(req, res) {
  const modelId = Number(req.params.id);
  try {
    const precheck = await checker(model, modelId);
    if (precheck) {
      const result = await model.findUnique({
        where: {
          id: modelId,
        },
        include: {
          outfits: true,
        },
      });
      res.json(result);
    } else {
      throw "no such model ";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function getOneModelOutfits(req, res) {}
async function addOneModel(req, res) {
  try {
    const result = await model.create({
      data: req.body,
    });

    res.json(result);
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function updateOneModel(req, res) {
  const modelId = Number(req.params.id);
  try {
    const precheck = await checker(model, modelId);
    if (precheck) {
      const result = await model.update({
        where: {
          id: modelId,
        },
        data: req.body,
      });
      res.json(result);
    } else {
      throw "no such model ";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function deleteOneModel(req, res) {
  const modelId = Number(req.params.id);
  try {
    const precheck = await checker(model, modelId);
    if (precheck) {
      const result = await model.delete({
        where: {
          id: modelId,
        },
      });
      res.json(result);
    } else {
      throw "no such model ";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}

module.exports = {
  getAllModels,
  getOneModel,
  getOneModelOutfits,
  addOneModel,
  updateOneModel,
  deleteOneModel,
};
