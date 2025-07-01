/*
  Warnings:

  - You are about to drop the `TestA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestB` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestC` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestB" DROP CONSTRAINT "TestB_testA_ID_fkey";

-- DropTable
DROP TABLE "TestA";

-- DropTable
DROP TABLE "TestB";

-- DropTable
DROP TABLE "TestC";
