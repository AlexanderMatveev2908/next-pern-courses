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
  HTML: { label: "HTML", rootLanguage: true },
  CSS: { label: "CSS", rootLanguage: true },
  JAVASCRIPT: { label: "JavaScript", rootLanguage: true },
  REACT: { label: "React", rootLanguage: false },
  NEXT: { label: "Next.js", rootLanguage: false },
  ANGULAR: { label: "Angular", rootLanguage: false },
  SVELTE: { label: "Svelte", rootLanguage: false },
  VUE: { label: "Vue.js", rootLanguage: false },
  NODE: { label: "Node.js", rootLanguage: false },
  VANILLA: { label: "Vanilla", rootLanguage: true },
  EXPRESS: { label: "Express", rootLanguage: false },
  FASTIFY: { label: "Fastify", rootLanguage: false },
  NESTJS: { label: "NestJS", rootLanguage: false },
  BASH: { label: "Bash (Linux/macOS)", rootLanguage: true },
  PYTHON: { label: "Python", rootLanguage: true },
  JAVA: { label: "Java", rootLanguage: true },
  MONGODB: { label: "MongoDB", rootLanguage: false },
  POSTGRESQL: { label: "PostgreSQL", rootLanguage: false },
  JEST: { label: "Jest", rootLanguage: false },
  VITEST: { label: "Vitest", rootLanguage: false },
  PLAYWRIGHT: { label: "Playwright", rootLanguage: false },
  AWS: { label: "AWS", rootLanguage: false },
  DOCKER: { label: "Docker", rootLanguage: false },
  NGINX: { label: "Nginx", rootLanguage: false },
  VERCEL: { label: "Vercel", rootLanguage: false },
  NETLIFY: { label: "Netlify", rootLanguage: false },
  RAILWAY: { label: "Railway", rootLanguage: false },
  FLYIO: { label: "Fly.io", rootLanguage: false },
  RENDER: { label: "Render", rootLanguage: false },
  ATLAS: { label: "MongoDB Atlas", rootLanguage: false },
  MONGOOSE: { label: "Mongoose", rootLanguage: false },
  PGADMIN: { label: "pgAdmin", rootLanguage: false },
  SEQUELIZE: { label: "Sequelize", rootLanguage: false },
  TYPEORM: { label: "TypeORM", rootLanguage: false },
  PRISMA: { label: "Prisma", rootLanguage: false },
  SASS: { label: "Sass", rootLanguage: false },
  LESS: { label: "Less", rootLanguage: false },
  BOOTSTRAP: { label: "Bootstrap", rootLanguage: false },
  TAILWIND: { label: "Tailwind CSS", rootLanguage: false },
  POSTCSS: { label: "PostCSS", rootLanguage: false },
  FIGMA: { label: "Figma", rootLanguage: false },
} as const;

export const TechNormPkg: Record<keyof typeof TechPkg, string> =
  Object.fromEntries(Object.entries(TechPkg).map(([k, v]) => [[k], v.label]));

export type TechValType = keyof typeof TechPkg;
export type GradeType = keyof typeof GradePkg;
export type StackType = keyof typeof StackPkg;
