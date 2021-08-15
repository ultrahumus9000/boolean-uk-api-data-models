const { event, purchase, outfit } = require("../database");
const {
  errorHandler,
  getRamdomInt,
  idExsitingchecker,
  outfitChecker,
} = require("../../helper");
const e = require("express");

async function getAllOrders(req, res) {
  try {
    const result = await purchase.findMany({
      include: {
        outfits: true,
      },
    });
    res.json(result);
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function getOneOrder(req, res) {
  const orderId = Number(req.params.id);
  try {
    const precheck = await idExsitingchecker(purchase, orderId);
    if (precheck) {
      const result = await purchase.findUnique({
        where: {
          id: orderId,
        },
        include: {
          guest: {
            select: {
              name: true,
            },
          },
          outfits: true,
        },
      });
      res.json(result);
    } else {
      throw "no such order";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function addOneOrder(req, res) {
  const { outfitId, guestId } = req.body;

  try {
    if (await outfitChecker(outfitId)) {
      const result = await purchase.create({
        data: {
          outfits: {
            connect: {
              id: outfitId,
            },
          },
          guestId,
        },
        include: {
          outfits: true,
        },
      });
      res.json(result);
    } else {
      throw " outfit is already purchased";
    }
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function updateOneOrder(req, res) {
  // update more outfits or less outfits, reduce outfits is done in guest section
  const orderId = Number(req.params.id);
  const { outfitId, guestId } = req.body;
  try {
    const precheck = await idExsitingchecker(purchase, orderId);
    if (precheck) {
      if (await outfitChecker(outfitId)) {
        const result = await purchase.update({
          where: {
            id: orderId,
          },
          data: {
            outfits: {
              connect: {
                id: outfitId,
              },
            },
          },
          include: {
            outfits: true,
          },
        });
        res.json(result);
      } else {
        throw " outfit is already purchased";
      }
    } else {
      throw "no such order";
    }
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function deleteOneOrder(req, res) {
  const orderId = Number(req.params.id);
  try {
    const precheck = await idExsitingchecker(purchase, orderId);
    if (precheck) {
      await purchase.delete({
        where: {
          id: orderId,
        },
      });
      res.json("order has been deleted");
    } else {
      throw "no such order";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}

module.exports = {
  getAllOrders,
  getOneOrder,
  addOneOrder,
  updateOneOrder,
  deleteOneOrder,
};
