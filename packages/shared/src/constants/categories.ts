export const Difficulties = {
  BEGINNER: "Beginner",
  JUNIOR: "Junior",
  INTERMEDIATE: "Intermediate",
  EXPERT: "Expert",
} as const;

export const TechStack = {
  HTML: "HTML",
  CSS: "CSS",
  JAVASCRIPT: "JavaScript",
  BASH: "Bash (Linux/macOS)",
  POWERSHELL: "PowerShell (Windows)",
  PYTHON: "Python",
  JAVA: "Java",
  TESTING: "Testing",
  DEPLOYMENT: "Deployment",
  MONGODB: "MongoDB",
  POSTGRESQL: "PostgreSQL",
  DESIGN: "Design",
} as const;

export const Tools = {
  HTML: {
    PRETTIER: "Prettier",
    EMMET: "Emmet",
    MUSTACHE: "Mustache",
    PUG: "Pug",
    LIGHTHOUSE: "Lighthouse",
    AXE: "axe-core (Accessibility)",
  },
  CSS: {
    SASS: "Sass",
    LESS: "Less",
    BOOTSTRAP: "Bootstrap",
    TAILWIND: "Tailwind CSS",
    POSTCSS: "PostCSS",
  },
  JAVASCRIPT: {
    REACT: "React",
    NEXT: "Next.js",
    ANGULAR: "Angular",
    SVELTE: "Svelte",
    VUE: "Vue.js",
    NODE: "Node.js",
    EXPRESS: "Express",
    FASTIFY: "Fastify",
    NESTJS: "NestJS",
    BUN: "Bun",
  },
  BASH: {
    GIT: "Git",
    GREP: "Grep",
    CURL: "cURL",
    AWK: "Awk",
    JQ: "jq",
  },
  POWERSHELL: {
    CHOCOLATEY: "Chocolatey",
    WINGET: "Winget",
  },
  PYTHON: {
    DJANGO: "Django",
    FASTAPI: "FastAPI",
    TORCH: "PyTorch",
    FLASK: "Flask",
    NUMPY: "NumPy",
    PANDAS: "Pandas",
  },
  JAVA: {
    SPRING: "Spring",
    MAVEN: "Maven",
    GRADLE: "Gradle",
  },
  TESTING: {
    JEST: "Jest",
    VITEST: "Vitest",
    PLAYWRIGHT: "Playwright",
    CYPRESS: "Cypress",
    TESTING_LIBRARY: "Testing Library",
  },
  DEPLOYMENT: {
    AWS: "AWS",
    DOCKER: "Docker",
    NGINX: "Nginx",
    VERCEL: "Vercel",
    NETLIFY: "Netlify",
    RAILWAY: "Railway",
    FLYIO: "Fly.io",
    RENDER: "Render",
  },
  DESIGN: {
    FIGMA: "Figma",
    SKETCH: "Sketch",
    ADOBE_XD: "Adobe XD",
    CANVA: "Canva",
  },
  MONGODB: {
    ATLAS: "MongoDB Atlas",
    MONGOOSE: "Mongoose",
  },
  POSTGRESQL: {
    PGADMIN: "pgAdmin",
    SEQUELIZE: "Sequelize",
    TYPEORM: "TypeORM",
    PRISMA: "Prisma",
  },
} as const;

// ? ROOT
// ? typeof Tools
// ? [keyof typeof Tools] => get keys of Tools root
// ? [keyof *] => get nested vals inside root
// ? (typeof Tools) repeat pattern as first one
export type ToolValType = keyof (typeof Tools)[keyof typeof Tools];

export type TechValType = keyof typeof TechStack;

export type DifficultyType = keyof typeof Difficulties;

export const AllTools = Object.values(Tools)
  .flatMap((v) => Object.values(v))
  .filter(Boolean);

export const isValidTool = (
  Tech: keyof typeof TechStack,
  tool: ToolValType,
) => {
  return (Object.keys(Tools[Tech as keyof typeof Tools]) ?? []).includes(tool);
};

export const getToolsByTech = (Tech: keyof typeof TechStack) =>
  Object.entries(Tools[Tech as keyof typeof Tools]);
