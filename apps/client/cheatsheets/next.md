# 🧠 Next.js Rendering Modes Cheat Sheet

Understand how to control rendering behavior in `app/` directory using `dynamic`, `revalidate`, and `fetch` options.

---

## ⚡ Server-Side Rendering (SSR)

Page is rendered **on every request**.

### ✅ Enable SSR

```ts
export const dynamic = "force-dynamic";
```

Or:

```ts
await fetch("/api/data", { cache: "no-store" });
```

Or:

```ts
export const revalidate = 0;
```

---

## 📦 Static Site Generation (SSG)

Page is rendered **at build time only**, served from CDN. No regeneration.

### ✅ Enable SSG

```ts
export const revalidate = false;
```

---

## 🔄 Incremental Static Regeneration (ISR)

Page is statically rendered but **can be revalidated** at runtime.

### ✅ Enable ISR with interval

```ts
export const revalidate = 60; // seconds
```

### ✅ ISR (on-demand) default behavior

If you don’t set `revalidate`, Next.js still uses ISR — **but with no revalidation**

This means:

- Cached page stays until a redeploy or manual revalidation
- Vercel logs show: `Cache: PRERENDER`

---

## 🧪 Summary Table

| Config                                    | Mode          | Behavior                         |
| ----------------------------------------- | ------------- | -------------------------------- |
| _(Nothing)_                               | ISR (default) | Static at build, no revalidate   |
| `export const revalidate = false;`        | SSG           | Pure static, no regeneration     |
| `export const revalidate = 60;`           | ISR           | Revalidate after 60s             |
| `export const dynamic = "force-dynamic";` | SSR           | Server-rendered on every request |
| `fetch(..., { cache: "no-store" })`       | SSR           | Triggers dynamic rendering       |
| `export const revalidate = 0;`            | SSR           | Same effect as `force-dynamic`   |

---

## 📝 Best Practices

- ✅ Use **SSG** (`revalidate = false`) for static content (e.g. marketing pages)
- 🔄 Use **ISR** for semi-dynamic content (e.g. blogs, dashboards)
- ⚙️ Use **SSR** for fully dynamic/authenticated pages (e.g. user profile, admin panels)

---

## 🔍 How to confirm on Vercel

Check the **Logs** or **Request Info** on your Vercel dashboard:

- `Cache: MISS / REVALIDATED / STALE` → **ISR**
- `Cache: PRERENDER` → **ISR (default behavior)**
- `Cache: NO-CACHE` → **SSR**
