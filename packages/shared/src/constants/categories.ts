export enum Difficulties {
  beginner = "Beginner",
  intermediate = "Intermediate",
  junior = "Junior",
  expert = "Expert",
}

export const TechStack = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  bash: "Bash (Linux/macOS)",
  powershell: "PowerShell (Windows)",
  python: "Python",
  java: "Java",
  testing: "Testing",
  deployment: "Deployment",
  mongodb: "MongoDB",
  postgresql: "PostgreSQL",
  design: "Design",
} as const;

export const Tools = {
  html: {},
  css: {
    sass: "Sass",
    less: "Less",
    bootstrap: "Bootstrap",
    tailwind: "Tailwind CSS",
    postcss: "PostCSS",
  },
  javascript: {
    react: "React",
    next: "Next.js",
    angular: "Angular",
    svelte: "Svelte",
    vue: "Vue.js",

    node: "Node.js",
    express: "Express",
    fastify: "Fastify",
    nestjs: "NestJS",
    bun: "Bun",
  },
  bash: {
    git: "Git",
    grep: "Grep",
    curl: "cURL",
    awk: "Awk",
    jq: "jq",
  },
  powershell: {
    chocolatey: "Chocolatey",
    winget: "Winget",
  },
  python: {
    django: "Django",
    fastapi: "FastAPI",
    torch: "PyTorch",
    flask: "Flask",
    numpy: "NumPy",
    pandas: "Pandas",
  },
  java: {
    spring: "Spring",
    maven: "Maven",
    gradle: "Gradle",
  },
  testing: {
    jest: "Jest",
    vitest: "Vitest",
    playwright: "Playwright",
    cypress: "Cypress",
    testing_library: "Testing Library",
  },
  deployment: {
    aws: "AWS",
    docker: "Docker",
    nginx: "Nginx",
    vercel: "Vercel",
    netlify: "Netlify",
    railway: "Railway",
    flyio: "Fly.io",
    render: "Render",
  },
  design: {
    figma: "Figma",
    sketch: "Sketch",
    adobe_xd: "Adobe XD",
    canva: "Canva",
  },
  mongodb: {
    atlas: "MongoDB Atlas",

    mongoose: "Mongoose",
  },
  postgresql: {
    pgadmin: "pgAdmin",

    sequelize: "Sequelize",
    typeorm: "TypeORM",
    prisma: "Prisma",
  },
} as const;

// ? ROOT
// ? typeof Tools
// ? [keyof typeof Tools] => get keys of Tools root
// ? [keyof *] => get nested vals inside root
// ? (typeof Tools) repeat pattern as first one
export type ToolValType =
  (typeof Tools)[keyof typeof Tools][keyof (typeof Tools)[keyof typeof Tools]];

export type TechValType = (typeof TechStack)[keyof typeof TechStack];

export const AllTools = Object.values(Tools)
  .flatMap((v) => Object.values(v))
  .filter(Boolean);

export const isValidTool = (
  Tech: keyof typeof TechStack,
  tool: ToolValType,
) => {
  return (Object.values(Tools[Tech as keyof typeof Tools]) ?? []).includes(
    tool,
  );
};

export const getToolsByTech = (Tech: keyof typeof TechStack) =>
  Object.values(Tools[Tech as keyof typeof Tools]);
