/*
  Warnings:

  - You are about to drop the column `eventToGuestId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventToGuestId` on the `Guest` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `EventToGuest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestId` to the `EventToGuest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_eventToGuestId_fkey";

-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_eventToGuestId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "eventToGuestId";

-- AlterTable
ALTER TABLE "EventToGuest" ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "guestId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "eventToGuestId";

-- CreateTable
CREATE TABLE "_EventToGuestToGuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventToGuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToGuestToGuest_AB_unique" ON "_EventToGuestToGuest"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToGuestToGuest_B_index" ON "_EventToGuestToGuest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventToGuest_AB_unique" ON "_EventToEventToGuest"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventToGuest_B_index" ON "_EventToEventToGuest"("B");

-- AddForeignKey
ALTER TABLE "EventToGuest" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventToGuest" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGuestToGuest" ADD FOREIGN KEY ("A") REFERENCES "EventToGuest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGuestToGuest" ADD FOREIGN KEY ("B") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventToGuest" ADD FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventToGuest" ADD FOREIGN KEY ("B") REFERENCES "EventToGuest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
