/*
  Warnings:

  - You are about to drop the column `quizID` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `questionID` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_conceptID_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_quizID_fkey";

-- DropIndex
DROP INDEX "Variant_quizID_idx";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "quizID",
ADD COLUMN     "questionID" TEXT NOT NULL;

-- DropTable
DROP TABLE "Quiz";

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "conceptID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_conceptID_title_idx" ON "Question"("conceptID", "title");

-- CreateIndex
CREATE INDEX "Variant_questionID_idx" ON "Variant"("questionID");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_conceptID_fkey" FOREIGN KEY ("conceptID") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
