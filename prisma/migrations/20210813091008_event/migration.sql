/*
  Warnings:

  - Added the required column `eventId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
