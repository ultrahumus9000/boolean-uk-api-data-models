-- DropForeignKey
ALTER TABLE "outfits" DROP CONSTRAINT "outfits_eventId_fkey";

-- AlterTable
ALTER TABLE "outfits" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
