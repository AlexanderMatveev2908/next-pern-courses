import { parseTechObj } from "../lib/etc.js";

export const GradePkg = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
} as const;

export const StackPkg = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  FULLSTACK: "Fullstack",
  DEVOPS: "DevOps",
  TOOLS: "Tools",
} as const;

export const TechPkg = {
  HTML: { label: "HTML", rootLanguage: true, stack: "FRONTEND" },
  CSS: { label: "CSS", rootLanguage: true, stack: "FRONTEND" },
  JAVASCRIPT: { label: "JavaScript", rootLanguage: true, stack: "FRONTEND" },
  REACT: { label: "React", rootLanguage: false, stack: "FRONTEND" },
  NEXT: { label: "Next.js", rootLanguage: false, stack: "FULLSTACK" },
  ANGULAR: { label: "Angular", rootLanguage: false, stack: "FRONTEND" },
  SVELTE: { label: "Svelte", rootLanguage: false, stack: "FRONTEND" },
  VUE: { label: "Vue.js", rootLanguage: false, stack: "FRONTEND" },
  NODE: { label: "Node.js", rootLanguage: false, stack: "BACKEND" },
  VANILLA: { label: "Vanilla", rootLanguage: true, stack: "FRONTEND" },
  EXPRESS: { label: "Express", rootLanguage: false, stack: "BACKEND" },
  FASTIFY: { label: "Fastify", rootLanguage: false, stack: "BACKEND" },
  NESTJS: { label: "NestJS", rootLanguage: false, stack: "BACKEND" },
  BASH: { label: "Bash (Linux/macOS)", rootLanguage: true, stack: "DEVOPS" },
  PYTHON: { label: "Python", rootLanguage: true, stack: "BACKEND" },
  JAVA: { label: "Java", rootLanguage: true, stack: "BACKEND" },
  MONGODB: { label: "MongoDB", rootLanguage: false, stack: "BACKEND" },
  POSTGRESQL: { label: "PostgreSQL", rootLanguage: false, stack: "BACKEND" },
  JEST: { label: "Jest", rootLanguage: false, stack: "TOOLS" },
  VITEST: { label: "Vitest", rootLanguage: false, stack: "TOOLS" },
  PLAYWRIGHT: { label: "Playwright", rootLanguage: false, stack: "TOOLS" },
  AWS: { label: "AWS", rootLanguage: false, stack: "DEVOPS" },
  DOCKER: { label: "Docker", rootLanguage: false, stack: "DEVOPS" },
  NGINX: { label: "Nginx", rootLanguage: false, stack: "DEVOPS" },
  VERCEL: { label: "Vercel", rootLanguage: false, stack: "DEVOPS" },
  NETLIFY: { label: "Netlify", rootLanguage: false, stack: "DEVOPS" },
  RAILWAY: { label: "Railway", rootLanguage: false, stack: "DEVOPS" },
  FLYIO: { label: "Fly.io", rootLanguage: false, stack: "DEVOPS" },
  RENDER: { label: "Render", rootLanguage: false, stack: "DEVOPS" },
  NGROK: { label: "ngrok", rootLanguage: false, stack: "DEVOPS" },
  SUPABASE: { label: "Supabase", rootLanguage: false, stack: "DEVOPS" },
  ATLAS: { label: "MongoDB Atlas", rootLanguage: false, stack: "DEVOPS" },
  MONGOOSE: { label: "Mongoose", rootLanguage: false, stack: "BACKEND" },
  PGADMIN: { label: "pgAdmin", rootLanguage: false, stack: "TOOLS" },
  SEQUELIZE: { label: "Sequelize", rootLanguage: false, stack: "BACKEND" },
  TYPEORM: { label: "TypeORM", rootLanguage: false, stack: "BACKEND" },
  PRISMA: { label: "Prisma", rootLanguage: false, stack: "BACKEND" },
  SASS: { label: "Sass", rootLanguage: false, stack: "FRONTEND" },
  LESS: { label: "Less", rootLanguage: false, stack: "FRONTEND" },
  BOOTSTRAP: { label: "Bootstrap", rootLanguage: false, stack: "FRONTEND" },
  TAILWIND: { label: "Tailwind CSS", rootLanguage: false, stack: "FRONTEND" },
  POSTCSS: { label: "PostCSS", rootLanguage: false, stack: "FRONTEND" },
  FIGMA: { label: "Figma", rootLanguage: false, stack: "TOOLS" },
  POSTMAN: { label: "Postman", rootLanguage: false, stack: "TOOLS" },
  GIT: { label: "Git", rootLanguage: false, stack: "TOOLS" },
  YARN: { label: "Yarn", rootLanguage: false, stack: "TOOLS" },
} as const;

export const TechNormPkg: Record<keyof typeof TechPkg, string> =
  parseTechObj(TechPkg);

export type TechValType = keyof typeof TechPkg;
export type GradeType = keyof typeof GradePkg;
export type StackType = keyof typeof StackPkg;
