import { exit } from "process";

const branch = process.env.VERCEL_GIT_COMMIT_REF || process.env.GIT_BRANCH;

console.log(`Detected branch: ${branch}`);

if (branch !== "main") {
  console.log(`⛔ Skipping build for branch: ${branch}`);
  exit(0);
}

console.log(`✅ Proceeding with build for branch: ${branch}`);
process.exit(1);
