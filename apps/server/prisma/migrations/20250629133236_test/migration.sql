-- CreateTable
CREATE TABLE "TestA" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "TestA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "testA_ID" TEXT NOT NULL,

    CONSTRAINT "TestB_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestB" ADD CONSTRAINT "TestB_testA_ID_fkey" FOREIGN KEY ("testA_ID") REFERENCES "TestA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
