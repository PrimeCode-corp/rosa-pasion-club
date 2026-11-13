# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

**Next.js 16.4 / React 19.3** — APIs differ from older training data (e.g. route `params` are a `Promise` and must be awaited; `cookies()` is async). Per AGENTS.md, read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code (run `npm install` first if `node_modules` is missing).

Stack and versions mirror `../rosapasion-club` (same `package-lock.json`).

## Commands

```bash
npm run dev          # next dev (Turbopack)
npm run build        # next build (output: "standalone")
npm run start        # next start
npm run lint         # eslint (flat config, next core-web-vitals + typescript)
npm run db:generate  # prisma generate (after editing prisma/schema.prisma)
npm run db:push      # prisma db push (no migrations)
npm run db:seed      # tsx prisma/seed.ts
```

Copy `.env.example` to `.env`. Production via PM2 (`ecosystem.config.js`).

## Conventions

- Styling: Tailwind v4 via `@tailwindcss/turbopack` loader (configured in `next.config.ts`, no tailwind/postcss config file). Theme tokens in `app/globals.css` `@theme inline`.
- Prisma singleton in `lib/prisma.ts`. Validation with Zod v4. Auth helpers: `jose` (JWT) + `bcryptjs`. Images: `sharp` (server external package). Icons: `lucide-react`.
- Path alias `@/*` → repo root.
