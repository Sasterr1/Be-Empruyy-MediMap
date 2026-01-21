/*
  Warnings:

  - You are about to drop the column `openHours` on the `pharmacies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `pharmacies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `closeTime` to the `pharmacies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openTime` to the `pharmacies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pharmacies" DROP COLUMN "openHours",
ADD COLUMN     "closeTime" VARCHAR(5) NOT NULL,
ADD COLUMN     "openTime" VARCHAR(5) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pharmacies_userId_key" ON "pharmacies"("userId");
