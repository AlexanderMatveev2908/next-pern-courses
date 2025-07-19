# NEXT-PERN-COURSES 📚

- The name might seem confusing at first, but it's intentional
  - `NEXT` stands for `Next.js`, the frontend framework used.
  - `PERN` usually means `PostgreSQL`, `Express`, `React`, `Node` — but in my case, I swapped `Express` with `Fastify` to explore a new modern backend framework.

## 🧰 Tech Stack

### Frontend

- **Next.js** – App directory routing, SSR/CSR mix
- **React** – Core UI library
- **TypeScript** – Full type safety across the stack
- **Redux Toolkit** – Global state management
- **RTK Query** – Data fetching and caching
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth animations
- **Emotion** – CSS-in-JS for dynamic styles

### Backend

- **Fastify** – High-performance Node.js web framework
- **Prisma** – Type-safe ORM for PostgreSQL
- **Zod** – Runtime validation for inputs and schemas (schemas shared between client and server via the `packages/` folder)
- **PostgreSQL** – Relational database

### DevOps & Infrastructure

- **Docker** – Containerized development and deployment
  - Backend and client run in isolated containers
- **GitHub Actions** – CI/CD pipelines
  - Runs linting and type-checking on every push or merge to `main` (CI)
  - Deploys both client and server to Fly.io automatically on success (CD)
- **Nginx** – Reverse proxy local development
- **Fly.io** – Deployment platform for both frontend and backend (Docker-based)
- **Vercel** — Initially used for client deployment, replaced by Fly.io
- **Supabase** – Hosted PostgreSQL database provider

### Tooling

- **Turborepo** – Monorepo management
- **Yarn Berry (with node_modules linker)** – Package manager

## 🛠️ Setup

- **Database Hosting** – For this project, I used [Supabase](https://supabase.com) because my free-tier on [Aiven](https://aiven.io) didn’t allow creating new databases.  
  You can use either [Aiven](https://aiven.io) or [Supabase](https://supabase.com) — both are excellent platforms for hosting PostgreSQL databases.

- **App Hosting Platforms** – So far I’ve used [Render](https://render.com),[Fly.io](https://fly.io) and [Vercel](https://vercel.com) for deployment.
  - **Render** offers a completely free plan, but cold starts can sometimes be noticeably slow.
  - **Fly.io** starts with a $5 monthly credit for outbound data and traffic. After that, it operates on a pay-as-you-go model.
  - **Vercel** has no cold starts and offers the best integration for **Next.js apps**. However, it's only suitable for backends if you're using a **serverless** structure — traditional custom servers (like Fastify) aren't supported directly.

If you decide to use [Fly.io](https://fly.io), you'll need to:

1. Create an account and go to the **Access Tokens** section.
2. Generate **two tokens**: one for the client and one for the server (each has its own `Dockerfile` and `fly.toml`).
3. Add these tokens to your repo's settings under  
   **Settings → Secrets and variables → Actions → Repository secrets**.

This allows GitHub Actions to authenticate and deploy both apps during CI/CD.

If you choose [Render](https://render.com) or [Vercel](https://vercel.com), deployments happen automatically on `push` or `merge` to the `main` branch — no custom CI/CD pipeline is required.

### ⚠️ Deployment Considerations: Split Client & Server Hosting

Hosting the frontend (`Next.js`) and backend (`Fastify API`) on **different platforms** (e.g. `Vercel` + `Fly.io` or `Render`) can introduce deployment issues that are important to keep in mind:

- **Race conditions during deployment**  
  If the `Next.js` app (hosted on `Vercel` or `Fly.io`) builds and runs before the Fastify server is fully deployed, any API calls made at build time can fail resulting in 500 errors.

- **Cold start sync issues**  
  When the frontend is live on `Vercel` but the backend is still waking up (e.g. on `Render` or `Fly.io`), you’ll experience `500 Internal Server Errors` on the frontend until the server becomes responsive.  
  This requires **manual delay handling or retry strategies**.

🧠 For this reason, I moved both frontend and backend to **Fly.io**, using Docker for consistent deploy timing.

## 🧬 Database Models

For this project, I chose to explore a new modern ORM — [Prisma](https://www.prisma.io/) — instead of using [Sequelize](https://sequelize.org/), which I had already worked with in the past

Prisma uses its own **domain-specific language (DSL)** for modeling data, and all models are typically managed in a single `schema.prisma` file located in the `prisma/` directory.

While Prisma is great for type safety and migrations, it doesn't natively support splitting models across multiple files — which can lead to a bloated `schema.prisma` as your app grows.

To work around this, I created a custom solution:

- I keep individual model files in a separate `models/` directory
- I use a **Bash script** to merge them in order into a single `schema.prisma`
- Then I trigger the Prisma migration with a custom name

### 🛠️ Schema Merge Script

```bash
# dmm stands for database merge and migrate
dmm() {
  local dev_dir="./models"
  local prisma_dir="./prisma"
  local output_file="schema.prisma"
  local output_path="$prisma_dir/$output_file"

  # clear all previous content from schema.prisma
  : > "$output_path"

  for f in "$dev_dir"/*; do
  # skip if current item is not a file
    [[ ! -f "$f" ]] && continue
  # Add clear boundaries for each file's contents
    echo -e "\n/* => start $(basename "$f") */" >> "$output_path"
    cat "$f" >> "$output_path"
    echo -e "\n/* => end $(basename "$f") */" >> "$output_path"
  done

  echo "Merged schemas to $output_path"
  yarn prisma migrate dev --name "$1"
}
```
