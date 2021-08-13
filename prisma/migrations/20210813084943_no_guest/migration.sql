-- DropForeignKey
ALTER TABLE "outfits" DROP CONSTRAINT "outfits_guestId_fkey";

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
