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

## Landing (mock mode)

`app/page.tsx` renders `components/portal/portal-view.tsx`, ported from `rosapasion-club` almost verbatim. There is no DB yet: data comes from `lib/mock/data.ts`, and `lib/mock/actions.ts` replaces the original Server Actions (`lookupMemberByDocOrCode`, `redeemBenefitInStore`, `submitRenewalPayment`) with the same signatures. `app/api/social-posts` and `app/api/upload-voucher` are mock routes. To connect the DB, add `actions/*.ts` ("use server") and switch the imports in `components/portal`.

Demo DNIs: 12345678 (active), 22222222 (expires in 3 days), 33333333 (expired), 44444444 (pending payment). Demo store codes: 1111–7777.

## Conventions

- Styling: Tailwind v4 via `@tailwindcss/postcss` (`postcss.config.mjs`, the setup from the Next 16 docs). Unlike `rosapasion-club`, this project does not use the `@tailwindcss/turbopack` loader: with it, edits to `globals.css` were not picked up in `next dev` and CSS Modules lost their class names. Theme tokens in `app/globals.css` `@theme inline`.
- Prisma singleton in `lib/prisma.ts`. Validation with Zod v4. Auth helpers: `jose` (JWT) + `bcryptjs`. Images: `sharp` (server external package). Icons: `lucide-react`.
- Path alias `@/*` → repo root.
