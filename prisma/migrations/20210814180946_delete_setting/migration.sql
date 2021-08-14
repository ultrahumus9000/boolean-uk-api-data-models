/*
  Warnings:

  - Made the column `guestId` on table `EventToGuest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EventToGuest" DROP CONSTRAINT "EventToGuest_guestId_fkey";

-- AlterTable
ALTER TABLE "EventToGuest" ALTER COLUMN "guestId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "EventToGuest" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
