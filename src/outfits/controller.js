const { event, outfit } = require("../database");
const {
  errorHandler,
  getRamdomInt,
  idExsitingchecker,
  outfitChecker,
} = require("../../helper");
const e = require("express");

async function getAllOutfits(req, res) {
  try {
    const result = await outfit.findMany();
    res.json(result);
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function getOneOutfit(req, res) {
  const outfitId = Number(req.params.id);

  try {
    if (await idExsitingchecker(outfit, outfitId)) {
      const result = await outfit.findUnique({
        where: {
          id: outfitId,
        },
        include: {
          purchase: {
            include: {
              guest: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      res.json(result);
    } else {
      throw "no such outfit";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function addOneOutfit(req, res) {
  // need to check all properties either frontend or backend

  try {
    const result = await outfit.create({
      data: req.body,
    });
    res.json(result);
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function updateOneOutfit(req, res) {
  const outfitId = Number(req.params.id);
  try {
    const precheck = await idExsitingchecker(outfit, outfitId);
    if (precheck) {
      const result = await outfit.update({
        where: {
          id: outfitId,
        },
        data: {
          ...precheck,
          ...req.body,
        },
      });
      res.json(result);
    } else {
      throw "no such outfit";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function deleteOneOutfit(req, res) {
  const outfitId = Number(req.params.id);
  try {
    if (await idExsitingchecker(outfit, outfitId)) {
      // no need to disconnect it first then deleted
      await outfit.delete({
        where: {
          id: outfitId,
        },
      });
      res.json("order is deleted");
    } else {
      throw "no such outfit";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}

module.exports = {
  getAllOutfits,
  getOneOutfit,
  addOneOutfit,
  updateOneOutfit,
  deleteOneOutfit,
};
