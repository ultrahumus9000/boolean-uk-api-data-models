/*
  Warnings:

  - You are about to drop the `_EventToEventToGuest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToGuestToGuest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToEventToGuest" DROP CONSTRAINT "_EventToEventToGuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToEventToGuest" DROP CONSTRAINT "_EventToEventToGuest_B_fkey";

-- DropForeignKey
ALTER TABLE "EventToGuest" DROP CONSTRAINT "EventToGuest_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventToGuest" DROP CONSTRAINT "EventToGuest_guestId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuestToGuest" DROP CONSTRAINT "_EventToGuestToGuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuestToGuest" DROP CONSTRAINT "_EventToGuestToGuest_B_fkey";

-- DropTable
DROP TABLE "_EventToEventToGuest";

-- DropTable
DROP TABLE "_EventToGuestToGuest";

-- AddForeignKey
ALTER TABLE "EventToGuest" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventToGuest" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
