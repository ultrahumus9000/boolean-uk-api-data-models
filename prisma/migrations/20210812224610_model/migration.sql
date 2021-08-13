/*
  Warnings:

  - Made the column `modelId` on table `outfits` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "outfits" DROP CONSTRAINT "outfits_modelId_fkey";

-- AlterTable
ALTER TABLE "outfits" ALTER COLUMN "modelId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "outfits" ADD FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
