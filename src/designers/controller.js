const { designer, model, event } = require("../database");
const {
  errorHandler,
  getRamdomInt,
  idExsitingchecker,
} = require("../../helper");
async function getAllDesigners(req, res) {
  try {
    const result = await designer.findMany();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function getOneDesigner(req, res) {
  const designerId = Number(req.params.id);
  try {
    const result = await designer.findUnique({
      where: {
        id: designerId,
      },
      include: {
        outfits: {
          select: {
            season: true,
            eventId: true,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function postOneDesigner(req, res) {
  // assume the designer must attend event and know which event he attend and must have outfits
  // designer doesnt know which model he have
  // disregards no outfits or no event issue

  const designerInfo = req.body;
  const { name, eventId } = designerInfo;
  let outfits = designerInfo.outfits;
  try {
    if (name && outfits && eventId) {
      const models = await model.findMany();
      const modelIds = models.map(({ id }) => id);
      const events = await event.findMany();
      const eventsIds = events.map(({ id }) => id);

      if (eventsIds.includes(eventId)) {
        outfits = outfits.map((outfit) => {
          const newInfo = {
            modelId: modelIds[getRamdomInt(modelIds)],
            eventId: eventId,
          };
          outfit = { ...outfit, ...newInfo };
          return outfit;
        });

        const result = await designer.create({
          data: {
            name: name,
            outfits: {
              createMany: {
                data: outfits,
              },
            },
          },
          include: {
            outfits: true,
          },
        });
        res.json(result);
      } else {
        throw "event id is wrong";
      }
    } else {
      throw "not enough information please specify your name or your art works and event Id";
      // could be in details to throw different errors
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}

// id         Int       @id @default(autoincrement())
// season     Season    @default(Summer)
// price      Float
// designer   Designer  @relation(fields: [designerId], references: [id], onDelete: Cascade)
// designerId Int
// model      Model     @relation(fields: [modelId], references: [id])
// modelId    Int
// purchase   Purchase? @relation(fields: [purchaseId], references: [id])
// purchaseId Int?
// event      Event     @relation(fields: [eventId], references: [id])
// eventId    Int

async function updateDesigner(req, res) {
  const updateInfo = req.body;
  const designerId = Number(req.params.id);
  const precheck = await idExsitingchecker(designer, designerId);
  console.log("precheck result", precheck);
  try {
    if (precheck) {
      const result = await designer.update({
        where: {
          id: designerId,
        },
        data: {
          ...precheck,
          ...updateInfo,
        },
      });
      res.json(result);
    } else {
      throw "no such designer";
    }
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function deleteDesigner(req, res) {
  const designerId = Number(req.params.id);
  const precheck = await idExsitingchecker(designer, designerId);

  try {
    if (precheck) {
      await designer.delete({
        where: {
          id: designerId,
        },
      });
      res.json(" designer info is deleted");
    } else {
      throw "no such designer";
    }
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  getAllDesigners,
  getOneDesigner,
  postOneDesigner,
  updateDesigner,
  deleteDesigner,
};
