/*
  Warnings:

  - The values [JUNIOR,EXPERT] on the enum `Grade` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tags` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `techStack` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `tools` on the `Course` table. All the data in the column will be lost.
  - Added the required column `tech` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `grade` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Stack" AS ENUM ('FRONTEND', 'BACKEND', 'FULLSTACK', 'DEVOPS', 'TOOLS');

-- CreateEnum
CREATE TYPE "Tech" AS ENUM ('HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'NEXT', 'ANGULAR', 'SVELTE', 'VUE', 'NODE', 'VANILLA', 'EXPRESS', 'FASTIFY', 'NESTJS', 'BASH', 'PYTHON', 'JAVA', 'MONGODB', 'POSTGRESQL', 'JEST', 'VITEST', 'PLAYWRIGHT', 'AWS', 'DOCKER', 'NGINX', 'VERCEL', 'NETLIFY', 'RAILWAY', 'FLYIO', 'RENDER', 'ATLAS', 'MONGOOSE', 'PGADMIN', 'SEQUELIZE', 'TYPEORM', 'PRISMA', 'SASS', 'LESS', 'BOOTSTRAP', 'TAILWIND', 'POSTCSS', 'FIGMA');

-- AlterEnum
BEGIN;
CREATE TYPE "Grade_new" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
ALTER TABLE "Course" ALTER COLUMN "grade" TYPE "Grade_new" USING ("grade"::text::"Grade_new");
ALTER TYPE "Grade" RENAME TO "Grade_old";
ALTER TYPE "Grade_new" RENAME TO "Grade";
DROP TYPE "Grade_old";
COMMIT;

-- DropIndex
DROP INDEX "Course_title_techStack_idx";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "tags",
DROP COLUMN "techStack",
DROP COLUMN "tools",
ADD COLUMN     "tech" "Tech" NOT NULL,
DROP COLUMN "grade",
ADD COLUMN     "grade" "Grade" NOT NULL;

-- DropEnum
DROP TYPE "TechStack";

-- DropEnum
DROP TYPE "Tools";

-- CreateIndex
CREATE INDEX "Course_title_tech_idx" ON "Course"("title", "tech");
