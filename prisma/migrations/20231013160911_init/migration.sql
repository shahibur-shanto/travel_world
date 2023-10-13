/*
  Warnings:

  - You are about to drop the column `name` on the `destination` table. All the data in the column will be lost.
  - Added the required column `country` to the `destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "destination" DROP COLUMN "name",
ADD COLUMN     "country" TEXT NOT NULL;
