-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Tech" ADD VALUE 'NGROK';
ALTER TYPE "Tech" ADD VALUE 'SUPABASE';
ALTER TYPE "Tech" ADD VALUE 'POSTMAN';
ALTER TYPE "Tech" ADD VALUE 'GIT';
ALTER TYPE "Tech" ADD VALUE 'YARN';
