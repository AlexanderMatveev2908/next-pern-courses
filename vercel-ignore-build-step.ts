import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { env, exit } from "process";

const branch = env.VERCEL_GIT_COMMIT_REF || env.GIT_BRANCH;

if (branch !== "main") {
  console.log(`⛔ Skipping build for branch: ${branch}`);

  const nextDir = join(process.cwd(), "apps/client/.next");

  if (!existsSync(nextDir)) mkdirSync(nextDir, { recursive: true });

  const manifestPath = join(nextDir, "routes-manifest.json");

  if (!existsSync(manifestPath)) {
    writeFileSync(
      manifestPath,
      JSON.stringify(
        {
          version: 3,
          pages404: true,
          dynamicRoutes: [],
          rewrites: [],
        },
        null,
        2,
      ),
    );
    console.log("✅ Injected stub routes-manifest.json");
  }

  exit(0);
}

console.log(`✅ Proceeding with build for branch: ${branch}`);
execSync("turbo build --filter=client...", { stdio: "inherit" });

// a
