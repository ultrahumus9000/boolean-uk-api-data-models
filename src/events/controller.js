const { checker } = require("../../helper");
const { event } = require("../database");

async function getAllEvents(req, res) {
  try {
    const result = await event.findMany();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function getOneEvent(req, res) {
  const eventId = Number(req.params.id);
  try {
    const precheck = await checker(event, eventId);
    if (precheck) {
      res.json(precheck);
    } else {
      res.json("no such event");
    }
  } catch (error) {
    res.json(error.message);
  }
}
async function getThemeModels(req, res) {
  const theme = req.params.theme;
  try {
    const result = await event.findMany({
      where: {
        theme,
      },
      include: {
        outfits: {
          select: {
            model: true,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function getThemeDesigners(req, res) {
  const theme = req.params.theme;
  try {
    const result = await event.findMany({
      where: {
        theme,
      },
      include: {
        outfits: {
          select: {
            designer: true,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function getThemeGuests(req, res) {
  const theme = req.params.theme;
  try {
    const result = await event.findMany({
      where: {
        theme,
      },
      include: {
        guests: true,
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

async function addOneEvent(req, res) {
  const { date, theme, address } = req.body;
  try {
    const result = await event.create({
      data: {
        date: new Date(date).toISOString(),
        theme,
        address,
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function updateOneEvent(req, res) {
  const eventId = Number(req.params.id);

  try {
    const precheck = await checker(event, eventId);
    if (precheck) {
      const result = await event.update({
        where: {
          id: eventId,
        },
        data: { ...precheck, ...req.body },
      });
      res.json(result);
    } else {
      res.json("no such event");
    }
  } catch (error) {
    res.json(error.message);
  }
}
async function deleteOneEvent(req, res) {
  const eventId = Number(req.params.id);
  try {
    const precheck = await checker(event, eventId);
    if (precheck) {
      const result = await event.delete({
        where: {
          id: eventId,
        },
      });
      res.json("result has been deleted");
    } else {
      res.json("no such event");
    }
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  getAllEvents,
  getOneEvent,
  getThemeModels,
  getThemeDesigners,
  getThemeGuests,
  addOneEvent,
  updateOneEvent,
  deleteOneEvent,
};
