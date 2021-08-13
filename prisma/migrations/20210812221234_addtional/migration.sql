-- DropForeignKey
ALTER TABLE "outfits" DROP CONSTRAINT "outfits_purchaseId_fkey";

-- AlterTable
ALTER TABLE "outfits" ALTER COLUMN "guestId" DROP NOT NULL,
ALTER COLUMN "purchaseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
