/*
  Warnings:

  - You are about to drop the column `guestId` on the `outfits` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "outfits" DROP CONSTRAINT "outfits_guestId_fkey";

-- AlterTable
ALTER TABLE "outfits" DROP COLUMN "guestId";
