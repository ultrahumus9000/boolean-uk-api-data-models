/*
  Warnings:

  - The `season` column on the `outfits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `eventId` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the `_DesignerToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToGuest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToModel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventToGuestId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventToGuestId` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Season" AS ENUM ('Spring', 'Summer', 'Autumn', 'Winter');

-- DropForeignKey
ALTER TABLE "_DesignerToEvent" DROP CONSTRAINT "_DesignerToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_DesignerToEvent" DROP CONSTRAINT "_DesignerToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuest" DROP CONSTRAINT "_EventToGuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuest" DROP CONSTRAINT "_EventToGuest_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToModel" DROP CONSTRAINT "_EventToModel_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToModel" DROP CONSTRAINT "_EventToModel_B_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_eventId_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "eventToGuestId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "eventToGuestId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "outfits" DROP COLUMN "season",
ADD COLUMN     "season" "Season" NOT NULL DEFAULT E'Summer';

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "eventId";

-- DropTable
DROP TABLE "_DesignerToEvent";

-- DropTable
DROP TABLE "_EventToGuest";

-- DropTable
DROP TABLE "_EventToModel";

-- CreateTable
CREATE TABLE "EventToGuest" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guest" ADD FOREIGN KEY ("eventToGuestId") REFERENCES "EventToGuest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD FOREIGN KEY ("eventToGuestId") REFERENCES "EventToGuest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
