/*
  Warnings:

  - Added the required column `questionID` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAnswer" ADD COLUMN     "isCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "questionID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
