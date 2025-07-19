# NEXT-PERN-COURSES 📚

- The name might seem confusing at first, but it's intentional
  - `NEXT` stands for `Next.js`, the frontend framework used.
  - `PERN` usually means `PostgreSQL`, `Express`, `React`, `Node` — but in my case, I swapped `Express` with `Fastify` to explore a new modern backend framework.

## 🧰 Tech Stack

### Frontend

- **Next.js** – App directory routing, SSR/CSR mix
- **React** – Core UI library
- **TypeScript** – Full type safety across the stack
- **react-hook-form** – Minimal and performant form state management with native validation integration
- **Redux Toolkit** – Global state management
- **RTK Query** – Data fetching and caching
- **Axios** – Used for HTTP requests and configured as RTK Query's base query
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth animations
- **Emotion** – CSS-in-JS for dynamic styles
- **Sass** – Used for global styling and design tokens
- **react-markdown** – Render markdown content in React
- **DOMPurify** – Sanitizes markdown HTML output to prevent XSS attacks

### Backend

- **Fastify** – High-performance Node.js web framework
- **Prisma** – Type-safe ORM for PostgreSQL
- **Zod** – Runtime validation for inputs and schemas (schemas shared between client and server via the `packages/` folder)
- **PostgreSQL** – Relational database
- **Cloudinary** – Media hosting and delivery (used for uploading and storing course/concept images or videos)
- **sql-template-tag** – Safe, readable raw SQL syntax for advanced custom queries outside Prisma's API

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

## 🛡️ Reverse Proxy (optional)

As part of my local development setup, I prefer to start an `NGINX` server so the environment closely mirrors the production setup.

This allows me to:

- Test CORS issues directly in development
- Simulate deployment flow more realistically

### 📜 NGINX Config Script

💡 Wherever you see `ninja` in paths (e.g. `/home/ninja/`), replace it with **your Linux username**, which you chose during OS installation.  
 You can check your current username with:

```bash
echo $USER
```

```bash
# http is the default NGINX user on Manjaro (Arch-based distros).
# It's preferred over 'root' to avoid permission issues
user http;
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    # Load MIME types from file to recognize extensions
    include mime.types;

    # Default to raw binary if MIME type is unknown
    default_type application/octet-stream;

    # Let the kernel handle file transfers for performance
    sendfile on;

    # Keep connections open for 65s before timing out
    keepalive_timeout 65;

    # Hide the NGINX version (like Helmet does for Node)
    server_tokens off;

    # Allocate more memory for MIME type hash table
    types_hash_max_size 2048;
    types_hash_bucket_size 128;

    # HTTP → HTTPS redirect
    server {
        listen 80;
        server_name localhost;

    # 301 code is a permanent redirection
        location / {
            return 301 https://$host$request_uri;
        }
    }

    # ✅ HTTPS server with reverse proxy
    server {
        listen 443 ssl;
        server_name localhost;

        # Increase body size limit (useful for file uploads)
        client_max_body_size 200M;

        # Restrict to modern TLS versions only
        ssl_protocols TLSv1.2 TLSv1.3;
        # exclude ciphers that allow anonymous key exchange and weak hashing algorithms
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Basic logging
        access_log /var/log/nginx/access.log;
        error_log  /var/log/nginx/error.log warn;

        # 🔐 SSL cert paths (use absolute paths)
        ssl_certificate     /home/ninja/certs/nginx-dev/localhost.pem;
        ssl_certificate_key /home/ninja/certs/nginx-dev/localhost-key.pem;

        # 🔁 Backend API (Fastify on :3000)
        location /api/v1/ {
            proxy_pass http://localhost:3000/api/v1/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # 🌐 Frontend App (Next.js on :3001)
        location / {
            proxy_pass http://localhost:3001/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

## App Logic ⚙️

### Typescript config 🟦

The client and server share Zod schemas, TypeScript types, and utility functions via a common package:

- Located at: `packages/shared`
- Imported using a path alias: `@shared/first`

📘 Any `tsconfig.json` used as a reference in other packages **must include**:

```json
{
  "compilerOptions": {
    "composite": true
  }
}
```

his makes shared packages (like `packages/shared`) usable across the monorepo — allowing you to alias and import them cleanly

### 📂 Folders Architecture

Both client and server follow a **feature-based architecture** that aims to encapsulate logic per domain while keeping shared utilities and reusable logic at the root level.

- On the **client**:
  - Folders like `components/` and `lib/` may exist both:
    - At `src` root level (shared across features)
    - Inside specific feature folders like `concepts/` (feature-scoped components)

- On the **server**:
  - The `middleware/` folder may appear:
    - At `src` root level for global middleware
    - Inside feature folders (e.g. `concepts/`) for domain-specific logic

### Validation ⚔️

Every form in the app is validated on **both the client and the server** using the same `Zod` schemas — shared via the `@shared/first` package.

- On the **client**, schemas validate user input immediately to improve UX.
- On the **server**, those same schemas are typically **extended** to handle backend-specific logic.

Special case: **file validation**

- On the **server**, files are **parsed** — which gives them a **different shape** than the browser's `File` object.
- As a result, the server uses a **custom Zod extension** to validate the parsed file structure correctly.

### Model Validations 📝

With **Sequelize**, you can inject custom `JavaScript` logic directly into your model definitions — for example, validating fields dynamically during creation. This allows you to define a field as a generic `STRING` and rely on pre-create validation to enforce correctness.

In contrast, the **domain-specific language (DSL)** of **Prisma** doesn't allow embedding JavaScript logic inside the schema so I had to be stricter on model definition

- Fields that define a `category` or even `sub category` are defined using strict `enum` types.
- This guarantees type safety at the database level and prevents accidental insertion of invalid values

### Assets 📷

Assets stored in the cloud follow a **polymorphic model** — meaning there's a single `CloudAsset` entity instead of creating separate asset tables for each model (like `CourseImage` or `ConceptVideo`).

`Prisma` does not support polymorphic relationships as `Sequelize` so you will need to join assets manually with a custom aggregation in a `raw query`

To organize asset metadata and support flexible query, the `CloudAsset` model includes:

- **`entityType`** — Indicates whether the asset belongs to a `COURSE` or a `CONCEPT`
- **`type`** — Specifies the asset type, such as `IMAGE` or `VIDEO`
- **`entityId`** — The UUID of the associated record
- **`publicID`** — so you will be able also to delete assets from cloud if you want to implement a `PUT` or `DELETE` route ofr `courses` or `concepts`
- **`url`** — url returned by `cloudinary` on `upload`

### Courses 📚

The entire app flow starts with the **creation of a course**.

As mentioned in the `Model Validations 📝` section, I used **Prisma `enum`s** to enforce stricter model constraints. These enums are autogenerated for the **server** in JavaScript, but since the **client** runs in its own isolated environment, it can’t import anything directly from the server.

To keep types in sync, I manually recreated the enums inside the `@shared/first` package — making them available to both client and server.

Inside `@shared/first`, the object that stores the available `Tech` choices includes `stack` and `label` keys, but also a **`rootLanguage`** boolean.  
This value is auto-filled in the form when a tech is selected — but of course, you can override it if you think differently 😈

## Concepts 📚

A single `Course` could have many `concepts`.
In `Course` page to add a `Concept` is enough to click the `add concept` in `actions dropdown`.

For `Concept` as well as for `Course` you must add a `markdown` and some `images`, optional a video based on feelings

There are some fields with information that could be useful:

- **estimatedTime** — how much last until now the course
- **pointsGained** — how many points is possible to gain until now with course
- **order** — index of current concept your are adding

I established a generic range of `3 - 10` for questions you can add for a concept but you can just modify the range in `@shared/first`

Each question will have its own `title` to gave question some context, the `question` itself of course and `5 variants` with one answer correct only

In database each question will be bind to a concept, each answer then will be bind to certain question.
The result will be that a concept will have an `Array` on questions and each `question` will have an `Array` of `variants`
