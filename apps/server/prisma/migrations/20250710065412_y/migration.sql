/*
  Warnings:

  - Added the required column `stack` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "estimatedTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pointsGained" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stack" "Stack" NOT NULL;
