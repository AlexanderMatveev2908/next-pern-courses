/*
  Warnings:

  - Added the required column `userConceptID` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAnswer" ADD COLUMN     "userConceptID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_userConceptID_fkey" FOREIGN KEY ("userConceptID") REFERENCES "UserConcept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
