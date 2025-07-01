export enum Difficulties {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  JUNIOR = "Junior",
  EXPERT = "Expert",
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
