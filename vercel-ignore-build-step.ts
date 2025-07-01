import { env, exit } from "process";

const branch = env.VERCEL_GIT_COMMIT_REF;

if (branch !== "main") {
  console.log(`⛔ Skipping build for branch: ${branch}`);
  exit(0);
}

console.log(`✅ Proceeding with build for branch: ${branch}`);
exit(1);
