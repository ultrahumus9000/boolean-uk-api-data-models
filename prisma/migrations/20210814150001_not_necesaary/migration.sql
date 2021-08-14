-- DropForeignKey
ALTER TABLE "EventToGuest" DROP CONSTRAINT "EventToGuest_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventToGuest" DROP CONSTRAINT "EventToGuest_guestId_fkey";

-- AlterTable
ALTER TABLE "EventToGuest" ALTER COLUMN "guestId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EventToGuest" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventToGuest" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
