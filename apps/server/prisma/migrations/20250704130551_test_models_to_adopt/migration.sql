-- CreateEnum
CREATE TYPE "TypeAsset" AS ENUM ('video', 'image');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('COURSE');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('beginner', 'junior', 'intermediate', 'expert');

-- CreateEnum
CREATE TYPE "TechStack" AS ENUM ('html', 'css', 'javascript', 'bash', 'powershell', 'python', 'java', 'testing', 'deployment', 'mongodb', 'postgresql', 'design');

-- CreateEnum
CREATE TYPE "Tools" AS ENUM ('prettier', 'emmet', 'mustache', 'pug', 'lighthouse', 'axe', 'sass', 'less', 'bootstrap', 'tailwind', 'postcss', 'react', 'next', 'angular', 'svelte', 'vue', 'node', 'express', 'fastify', 'nestjs', 'bun', 'git', 'grep', 'curl', 'awk', 'jq', 'chocolatey', 'winget', 'django', 'fastapi', 'torch', 'flask', 'numpy', 'pandas', 'spring', 'maven', 'gradle', 'jest', 'vitest', 'playwright', 'cypress', 'testing_library', 'aws', 'docker', 'nginx', 'vercel', 'netlify', 'railway', 'flyio', 'render', 'figma', 'sketch', 'adobe_xd', 'canva', 'atlas', 'mongoose', 'pgadmin', 'sequelize', 'typeorm', 'prisma');

-- CreateTable
CREATE TABLE "CloudAsset" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicID" TEXT NOT NULL,
    "type" "TypeAsset" NOT NULL,
    "entityID" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CloudAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "techStack" "TechStack" NOT NULL,
    "tools" "Tools" NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CloudAsset_entityID_entityType_idx" ON "CloudAsset"("entityID", "entityType");

-- CreateIndex
CREATE INDEX "Course_title_techStack_idx" ON "Course"("title", "techStack");
