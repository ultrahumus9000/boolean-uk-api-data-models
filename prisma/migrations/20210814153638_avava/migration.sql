/*
  Warnings:

  - A unique constraint covering the columns `[guestId,eventId]` on the table `EventToGuest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventToGuest.guestId_eventId_unique" ON "EventToGuest"("guestId", "eventId");
