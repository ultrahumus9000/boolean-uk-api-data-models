/*
  Warnings:

  - A unique constraint covering the columns `[season,designerId,price]` on the table `outfits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "outfits.season_designerId_price_unique" ON "outfits"("season", "designerId", "price");
