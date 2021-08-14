const { eventToGuest, event, guest, purchase, outfit } = require("../database");
const { errorHandler, getRamdomInt, checker } = require("../../helper");

async function getAllGuests(req, res) {
  try {
    const result = await guest.findMany();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}
async function getOneGuest(req, res) {
  const guestId = Number(req.params.id);
  try {
    const precheck = checker(guest, guestId);
    if (precheck) {
      const result = await guest.findUnique({
        where: {
          id: guestId,
        },
        include: {
          events: {
            select: {
              eventId: true,
            },
          },
          purchases: {
            select: {
              outfits: {
                select: {
                  id: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      res.json(result);
      return result;
    } else {
      throw "no such guest";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function getOneGuestOrders(req, res) {
  const guestId = Number(req.params.id);

  try {
    const precheck = checker(guest, guestId);
    if (precheck) {
      const result = await guest.findUnique({
        where: {
          id: guestId,
        },
        include: {
          purchases: {
            select: {
              outfits: {
                select: {
                  id: true,
                  price: true,
                },
              },
            },
          },
        },
      });
      res.json(result);
      return result;
    } else {
      throw "no such guest";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function getOneGuestTotalSpent(req, res) {}
async function postOneGuest(req, res) {}
async function updateOneGuest(req, res) {}
async function deleteOneGuest(req, res) {}

module.exports = {
  getAllGuests,
  getOneGuest,
  getOneGuestOrders,
  getOneGuestTotalSpent,
  postOneGuest,
  updateOneGuest,
  deleteOneGuest,
};
