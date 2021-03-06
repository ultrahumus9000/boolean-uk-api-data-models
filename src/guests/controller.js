const { eventToGuest, event, guest, purchase, outfit } = require("../database");
const { errorHandler, idExsitingchecker } = require("../../helper");

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
    const precheck = await idExsitingchecker(guest, guestId);
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
    const precheck = await idExsitingchecker(guest, guestId);
    if (precheck) {
      const result = await guest.findUnique({
        where: {
          id: guestId,
        },
        select: {
          purchases: {
            select: {
              outfits: {
                select: {
                  price: true,
                  id: true,
                  season: true,
                },
              },
            },
          },
        },
      });
      res.json(result);
    } else {
      throw "no such guest";
    }
  } catch (error) {
    res.json(errorHandler(error));
  }
}
async function getOneGuestTotalSpent(req, res) {
  const guestId = Number(req.params.id);
  try {
    const precheck = await idExsitingchecker(guest, guestId);
    if (precheck) {
      const rawResult = await guest.findUnique({
        where: {
          id: guestId,
        },
        select: {
          purchases: {
            select: {
              outfits: {
                select: {
                  price: true,
                },
              },
            },
          },
        },
      });

      const orders = rawResult.purchases;
      const filtedOrders = orders.map((order) => order.outfits);
      console.log(filtedOrders);
      const priceInfo = [];
      for (const order of filtedOrders) {
        for (const item of order) {
          priceInfo.push(item.price);
        }
      }

      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const totalSpent = priceInfo.reduce(reducer);

      res.json(`your total spent is ??${totalSpent}`);
    } else {
      throw "no such guest";
    }
  } catch (error) {
    res.json(error);
  }
}

async function postOneGuest(req, res) {
  const guestInfo = req.body;

  try {
    if (guestInfo.events) {
      const newGuest = await guest.create({
        data: {
          name: guestInfo.name,
        },
      });

      const eventsInfo = guestInfo.events;

      //model restrict same guest attend same event twice therefore no need to check
      const resultInfo = [];
      for await (const event of eventsInfo) {
        const result = await eventToGuest.create({
          data: {
            guestId: newGuest.id,
            eventId: event.id,
          },
        });
        resultInfo.push(result);
      }

      const finalResult = await guest.findUnique({
        where: {
          id: newGuest.id,
        },
        include: {
          events: true,
        },
      });
      res.json(finalResult);
    } else {
      const newGuest = await guest.create({
        data: guestInfo,
      });
      res.json(newGuest);
    }
  } catch (error) {
    res.json(error);
  }
}

async function updateOneGuest(req, res) {
  //update guest name, guest purchase, guest event however if the guest has alreay purchase item then he cannot modify attended events

  const { name, purchases, event, deleteEvent, deletePurchase } = req.body;
  const guestId = Number(req.params.id);
  try {
    const precheck = await idExsitingchecker(guest, guestId);
    if (precheck) {
      if (
        purchases === undefined &&
        event === undefined &&
        deleteEvent === undefined &&
        deletePurchase === undefined
      ) {
        const result = await guest.update({
          where: {
            id: guestId,
          },
          data: {
            name,
          },
        });
        res.json(result);
      } else {
        if (event) {
          // 2 user want to add more event he attend
          const result = await eventToGuest.create({
            data: {
              eventId: event,
              guestId,
            },
          });
          res.json(result);
        } else if (deleteEvent) {
          // 1, user want to cancel the event he attened

          const result = await eventToGuest.delete({
            where: {
              id: deleteEvent,
            },
          });
          //   guest.update({
          //     where: {
          //       id: guestId,
          //     },
          //     data: {
          //       events: {
          //         delete: {
          //           id: deleteEvent,
          //         },
          //       },
          //     },
          //     include: {
          //       events: true,
          //     },
          //   });
          res.json(result);
        } else {
          // find the purchase record first throuh which event but in real life it is not edidble after you started the show therefore no need to check for this case
          //only modify purchase that guest bought, can add more outfit or reduce outfit order
          // can only add more outfit based on the event he attended this should assume that he attended it first
          if (purchases) {
            // const result = await guest.update({
            //   where: {
            //     id: guestId,
            //   },
            //   data: {
            //     purchases: {
            //       create: {
            //         outfits: {
            //           connect: {
            //             id: purchases.outfitId,
            //           },
            //         },
            //       },
            //     },
            //   },
            //   include: {
            //     purchases: true,
            //   },
            // });

            const result = await outfit.update({
              where: {
                id: purchases.outfitId,
              },
              data: {
                purchase: {
                  upsert: {
                    update: {
                      guestId,
                    },
                    create: {
                      guestId,
                    },
                  },
                },
              },
            });
            // could be achieved by purchases too
            res.json(result);
          } else {
            const result = await purchase.update({
              where: {
                id: deletePurchase.id,
              },
              data: {
                outfits: {
                  disconnect: {
                    id: deletePurchase.outfitId,
                  },
                },
              },
              include: {
                guest: true,
                outfits: true,
              },
            });

            const deleteCheck = await purchase.findUnique({
              where: {
                id: deletePurchase.id,
              },
              include: {
                outfits: true,
              },
            });

            if (deleteCheck.outfits.length === 0) {
              const deletedResult = await purchase.delete({
                where: {
                  id: deletePurchase.id,
                },
              });
            }

            res.json(result);
          }
        }
      }
    } else {
      throw "no such guest";
    }
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function deleteOneGuest(req, res) {
  const guestId = Number(req.params.id);

  try {
    const result = await guest.delete({
      where: {
        id: guestId,
      },
    });
    res.json(`result has been deleted.`);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  getAllGuests,
  getOneGuest,
  getOneGuestOrders,
  getOneGuestTotalSpent,
  postOneGuest,
  updateOneGuest,
  deleteOneGuest,
};
