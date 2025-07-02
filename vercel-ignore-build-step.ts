import { env, exit } from "process";

const branch = env.VERCEL_GIT_COMMIT_REF || env.GIT_BRANCH;

if (branch !== "main") {
  console.log(`⛔ Skipping build for branch: ${branch}`);
  exit(1);
}

console.log(`✅ Proceeding with build for branch: ${branch}`);
process.exit(0);
