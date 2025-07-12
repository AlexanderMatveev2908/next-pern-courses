/*
  Warnings:

  - Added the required column `estimatedTime` to the `Concept` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Concept` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointsGained` to the `Concept` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Concept" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "estimatedTime" INTEGER NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "pointsGained" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "conceptID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "answer" TEXT NOT NULL,
    "quizID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Quiz_conceptID_title_idx" ON "Quiz"("conceptID", "title");

-- CreateIndex
CREATE INDEX "Variant_quizID_idx" ON "Variant"("quizID");

-- CreateIndex
CREATE INDEX "Concept_courseID_title_idx" ON "Concept"("courseID", "title");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_conceptID_fkey" FOREIGN KEY ("conceptID") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
