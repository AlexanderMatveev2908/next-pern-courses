/*
  Warnings:

  - The values [video,image] on the enum `TypeAsset` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeAsset_new" AS ENUM ('VIDEO', 'IMAGE');
ALTER TABLE "CloudAsset" ALTER COLUMN "type" TYPE "TypeAsset_new" USING ("type"::text::"TypeAsset_new");
ALTER TYPE "TypeAsset" RENAME TO "TypeAsset_old";
ALTER TYPE "TypeAsset_new" RENAME TO "TypeAsset";
DROP TYPE "TypeAsset_old";
COMMIT;
