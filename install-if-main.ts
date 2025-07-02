import { execSync } from "node:child_process";

const branch = process.env.VERCEL_GIT_COMMIT_REF || process.env.GIT_BRANCH;

if (branch !== "main") {
  console.log(`⛔ Skipping install for branch: ${branch}`);
  process.exit(1);
}

console.log(`✅ Installing for branch: ${branch}`);
execSync(
  "rm -rf apps/server && corepack enable && corepack prepare yarn@4.9.1 --activate && yarn install",
  {
    stdio: "inherit",
  },
);
process.exit(0);
