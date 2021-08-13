const faker = require("faker");

const { PrismaClient } = require("@prisma/client");
const { address } = require("faker");

const db = new PrismaClient();
const { designer, model, guest, purchase, event, outfit } = db;

const array = Array(10).fill("");

function getRamdomInt(array) {
  return Math.floor(Math.random() * array.length);
}

async function seed() {}

// model Designer {
//     id      Int      @id @default(autoincrement())
//     name    String
//     events  Event[]
//     outfits Outfit[]
//   }

//   model Guest {
//     id        Int        @id @default(autoincrement())
//     name      String
//     events    Event[]
//     purchases Purchase[]
//   }

//   model Model {
//     id      Int      @id @default(autoincrement())
//     name    String
//     events  Event[]
//     outfits Outfit[]
//   }

//   model Event {
//     id        Int        @id @default(autoincrement())
//     date      DateTime   @db.Date
//     theme     String
//     address   String
//     designers Designer[]
//     guests    Guest[]
//     models    Model[]
//     outfits   Outfit[]

//     @@map("events")
//   }

//   model Outfit {
//     id         Int       @id @default(autoincrement())
//     season     String
//     price      Float
//     designer   Designer  @relation(fields: [designerId], references: [id], onDelete: Cascade)
//     designerId Int
//     model      Model?    @relation(fields: [modelId], references: [id])
//     modelId    Int?
//     purchase   Purchase? @relation(fields: [purchaseId], references: [id])
//     purchaseId Int?
//     event      Event     @relation(fields: [eventId], references: [id])
//     eventId    Int

//     @@map("outfits")
//   }

// model Purchase {
//     id      Int      @id @default(autoincrement())
//     outfits Outfit[]
//     guest   Guest    @relation(fields: [guestId], references: [id], onDelete: Cascade)
//     guestId Int

//     @@map("purchases")
//   }

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

//   designer.create({
//     data: {
//       name: faker.name.findName(),
//       outfits: {
//         create: [
//           {
//             season: faker.music.genre(),
//             price: 200.5,
//             event: {
//               create: {
//                 date: faker.date.future(1),
//                 theme: faker.music.genre(),
//                 address: faker.address.streetAddress(),
//               },
//             },
//           },
//         ],
//       },
//     },
//   });

// model.create({
//     data: {
//       name: faker.name.findName(),
//       events: {
//         connect: {
//           id: eventsIds[getRamdomInt(eventsIds)],
//         },
//       },
//       outfits: {
//         connect: {
//           id: outfitsIds[getRamdomInt(outfitsIds)],
//         },
//       },
//     },
//   });

// await outfit.create({
//   data: {
//     season: faker.random.word(),
//     price: parseInt(Math.random() * 10000),
//     designer: {
//       connect: {
//         id: designerIds[getRamdomInt(designerIds)],
//       },
//     },
//     model: {
//       connect: {
//         id: modelIds[getRamdomInt(modelIds)],
//       },
//     },
//     event: {
//       connect: {
//         id: eventIds[getRamdomInt(eventIds)],
//       },
//     },
//   },
// });
