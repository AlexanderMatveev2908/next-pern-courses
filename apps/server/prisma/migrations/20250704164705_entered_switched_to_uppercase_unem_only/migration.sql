/*
  Warnings:

  - The values [beginner,junior,intermediate,expert] on the enum `Grade` will be removed. If these variants are still used in the database, this will fail.
  - The values [html,css,javascript,bash,powershell,python,java,testing,deployment,mongodb,postgresql,design] on the enum `TechStack` will be removed. If these variants are still used in the database, this will fail.
  - The values [prettier,emmet,mustache,pug,lighthouse,axe,sass,less,bootstrap,tailwind,postcss,react,next,angular,svelte,vue,node,express,fastify,nestjs,bun,git,grep,curl,awk,jq,chocolatey,winget,django,fastapi,torch,flask,numpy,pandas,spring,maven,gradle,jest,vitest,playwright,cypress,testing_library,aws,docker,nginx,vercel,netlify,railway,flyio,render,figma,sketch,adobe_xd,canva,atlas,mongoose,pgadmin,sequelize,typeorm,prisma] on the enum `Tools` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Grade_new" AS ENUM ('BEGINNER', 'JUNIOR', 'INTERMEDIATE', 'EXPERT');
ALTER TYPE "Grade" RENAME TO "Grade_old";
ALTER TYPE "Grade_new" RENAME TO "Grade";
DROP TYPE "Grade_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TechStack_new" AS ENUM ('HTML', 'CSS', 'JAVASCRIPT', 'BASH', 'POWERSHELL', 'PYTHON', 'JAVA', 'TESTING', 'DEPLOYMENT', 'MONGODB', 'POSTGRESQL', 'DESIGN');
ALTER TABLE "Course" ALTER COLUMN "techStack" TYPE "TechStack_new" USING ("techStack"::text::"TechStack_new");
ALTER TYPE "TechStack" RENAME TO "TechStack_old";
ALTER TYPE "TechStack_new" RENAME TO "TechStack";
DROP TYPE "TechStack_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Tools_new" AS ENUM ('PRETTIER', 'EMMET', 'MUSTACHE', 'PUG', 'LIGHTHOUSE', 'AXE', 'SASS', 'LESS', 'BOOTSTRAP', 'TAILWIND', 'POSTCSS', 'REACT', 'NEXT', 'ANGULAR', 'SVELTE', 'VUE', 'NODE', 'EXPRESS', 'FASTIFY', 'NESTJS', 'BUN', 'GIT', 'GREP', 'CURL', 'AWK', 'JQ', 'CHOCOLATEY', 'WINGET', 'DJANGO', 'FASTAPI', 'TORCH', 'FLASK', 'NUMPY', 'PANDAS', 'SPRING', 'MAVEN', 'GRADLE', 'JEST', 'VITEST', 'PLAYWRIGHT', 'CYPRESS', 'TESTING_LIBRARY', 'AWS', 'DOCKER', 'NGINX', 'VERCEL', 'NETLIFY', 'RAILWAY', 'FLYIO', 'RENDER', 'FIGMA', 'SKETCH', 'ADOBE_XD', 'CANVA', 'ATLAS', 'MONGOOSE', 'PGADMIN', 'SEQUELIZE', 'TYPEORM', 'PRISMA');
ALTER TABLE "Course" ALTER COLUMN "tools" TYPE "Tools_new" USING ("tools"::text::"Tools_new");
ALTER TYPE "Tools" RENAME TO "Tools_old";
ALTER TYPE "Tools_new" RENAME TO "Tools";
DROP TYPE "Tools_old";
COMMIT;
