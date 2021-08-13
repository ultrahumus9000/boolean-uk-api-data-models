const faker = require("faker");

const { PrismaClient } = require("@prisma/client");
const { address } = require("faker");

const db = new PrismaClient();
const { designer, model, purchase, event, outfit, eventToGuest } = db;

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const priceTags = [
  1000.0, 30790.0, 892.0, 700.0, 1250.0, 6789.0, 92340.0, 1236.0, 32456.0,
];
const array = Array(30).fill("");

function getRamdomInt(array) {
  return Math.floor(Math.random() * array.length);
}

async function seed() {
  for await (const ele of array) {
    await designer.create({
      data: {
        name: faker.name.findName(),
        outfits: {
          create: {
            season: seasons[getRamdomInt(seasons)],
            price: priceTags[getRamdomInt(priceTags)],
            model: {
              create: {
                name: faker.name.findName(),
              },
            },
            event: {
              create: {
                date: faker.date.future(1),
                address: faker.address.streetAddress(),
                theme: faker.music.genre(),
              },
            },
          },
        },
      },
    });
  }

  const events = await event.findMany();
  const eventIds = events.map(({ id }) => id);

  for await (const ele of array) {
    await guest.create({
      data: {
        name: faker.name.findName(),
      },
    });
  }

  const guests = await db.guest.findMany();
  const guestsIds = guests.map(({ id }) => id);

  for await (const ele of array) {
    await eventToGuest.create({
      data: {
        guestId: guestsIds[getRamdomInt(guestsIds)],
        eventId: eventIds[getRamdomInt(eventIds)],
      },
    });
  }

  let outfits = await outfit.findMany();
  outfits = outfits.slice(16, 20);
  const createPurchasesPromised = outfits.map(async (outfit) => {
    const guestsAttended = await eventToGuest.findMany({
      where: {
        eventId: outfit.eventId,
      },
    });

    const guestsArray = guestsAttended.map((attendedGuest) => {
      return attendedGuest.guestId;
    });
    console.log(guestsArray);
    return await purchase.create({
      data: {
        guestId: guestsArray[getRamdomInt(guestsArray)],
        outfits: {
          connect: {
            id: outfit.id,
          },
        },
      },
    });
  });

  await Promise.all(createPurchasesPromised);
}

// model Designer {
//     id      Int      @id @default(autoincrement())
//     name    String
//     outfits Outfit[]
//   }

//   model Guest {
//     id        Int            @id @default(autoincrement())
//     name      String
//     events    EventToGuest[]
//     purchases Purchase[]

//   }

//   model Model {
//     id      Int      @id @default(autoincrement())
//     name    String
//     outfits Outfit[]
//   }

//   model EventToGuest {
//     id      Int     @id @default(autoincrement())
//     guest   Guest[] @relation(fields: [guestId], references: [id])
//     guestId Int
//     event   Event[] @relation(fields: [eventId], references: [id])
//     eventId Int
//   }

//   model Event {
//     id      Int            @id @default(autoincrement())
//     date    DateTime       @db.Date
//     theme   String
//     address String
//     outfits Outfit[]
//     guests  EventToGuest[]

//     @@map("events")
//   }

//   model Outfit {
//     id         Int       @id @default(autoincrement())
//     season     Season    @default(Summer)
//     price      Float
//     designer   Designer  @relation(fields: [designerId], references: [id], onDelete: Cascade)
//     designerId Int
//     model      Model     @relation(fields: [modelId], references: [id])
//     modelId    Int
//     purchase   Purchase? @relation(fields: [purchaseId], references: [id])
//     purchaseId Int?
//     event      Event     @relation(fields: [eventId], references: [id])
//     eventId    Int

//     @@map("outfits")
//   }

//   model Purchase {
//     id      Int      @id @default(autoincrement())
//     outfits Outfit[]
//     guest   Guest    @relation(fields: [guestId], references: [id], onDelete: Cascade)
//     guestId Int

//     @@map("purchases")
//   }

//   enum Season {
//     Spring
//     Summer
//     Autumn
//     Winter
//   }

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
