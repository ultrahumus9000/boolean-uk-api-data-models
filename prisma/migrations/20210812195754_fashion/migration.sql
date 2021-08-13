-- CreateTable
CREATE TABLE "Designer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "theme" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outfits" (
    "id" SERIAL NOT NULL,
    "season" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "designerId" INTEGER NOT NULL,
    "modelId" INTEGER,
    "guestId" INTEGER NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "guestId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DesignerToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToGuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DesignerToEvent_AB_unique" ON "_DesignerToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_DesignerToEvent_B_index" ON "_DesignerToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToGuest_AB_unique" ON "_EventToGuest"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToGuest_B_index" ON "_EventToGuest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToModel_AB_unique" ON "_EventToModel"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToModel_B_index" ON "_EventToModel"("B");

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesignerToEvent" ADD FOREIGN KEY ("A") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesignerToEvent" ADD FOREIGN KEY ("B") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGuest" ADD FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGuest" ADD FOREIGN KEY ("B") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToModel" ADD FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToModel" ADD FOREIGN KEY ("B") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;
