import { execSync } from "child_process";
import { env, exit } from "process";

const branch = env.VERCEL_GIT_COMMIT_REF || env.GIT_BRANCH;

if (branch !== "main") {
  console.log(`⛔ Skipping build for branch: ${branch}`);

  exit(0);
}

console.log(`✅ Proceeding with build for branch: ${branch}`);
execSync("turbo build --filter=client...", { stdio: "inherit" });
