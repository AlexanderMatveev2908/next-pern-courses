-- AlterTable
ALTER TABLE "Concept" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserConcept" (
    "id" TEXT NOT NULL,
    "conceptID" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" TEXT NOT NULL,
    "variantID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserAnswer_variantID_idx" ON "UserAnswer"("variantID");

-- AddForeignKey
ALTER TABLE "UserConcept" ADD CONSTRAINT "UserConcept_conceptID_fkey" FOREIGN KEY ("conceptID") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_variantID_fkey" FOREIGN KEY ("variantID") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
