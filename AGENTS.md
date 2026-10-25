# Agent Instructions

Rules for any coding agent (Claude Code, Cursor, Codex, Copilot, ...) working in this repo. Read this before touching code. If a rule is out of date, fix it in the same change.

## What this repo is

Two portfolio websites in one repo:

- **[apps/sifna](apps/sifna)**: the graphic design portfolio of Fathima Sifna. She is a designer, not a developer, and edits her own projects in Sanity. **Built first.**
- **[apps/ashiq](apps/ashiq)**: Ashiq's developer portfolio (Flutter developer moving into AI engineering). Its content lives in code.

Ashiq is the only developer, and he is learning Next.js with this repo. Explain what you change and why, using Flutter comparisons where they help. When he asks for a review, review; don't rewrite his code.

## Golden rules

1. **Free plans only.** No service, feature or package that needs a paid plan or a card.
2. **Static export only.** Every app must build to plain static files (see [Static export](#static-export)).
3. **Keep it simple.** Small components, clear names. No shared packages, monorepo tools or abstractions until two apps really need the same code.
4. **Change only what the task needs.** No drive-by refactors, renames or reformatting.
5. **Don't guess.** If a requirement, design choice or content field is unclear, ask.

## Folder rules

Some folders have their own `AGENTS.md` with rules that only matter there:

| File | Covers |
| --- | --- |
| [apps/sifna/AGENTS.md](apps/sifna/AGENTS.md) | Sanity content, Sifna's design, images |

Next.js also creates an `AGENTS.md` in each app with a version notice between the `nextjs-agent-rules` markers, and re-adds it on `next dev`. Don't edit or delete that block; put app rules below it. `apps/ashiq/AGENTS.md` has only that notice for now.

- Each rule lives in one file only: here if it applies everywhere, or in the folder where someone would break it.
- Add a folder file only when a folder has several rules nothing outside it needs, and list it above.

## Project layout

```text
portfolio/
├── apps/
│   ├── sifna/      # Next.js site, content from Sanity
│   └── ashiq/      # Next.js site, content in code
└── studio/         # Sanity Studio, where Sifna edits her work (not created yet)
```

Each app is its own npm project with its own `node_modules`. There are no npm workspaces.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4**.
- This Next.js version has breaking changes from older tutorials and training data. Before using an API, read its guide in `apps/<app>/node_modules/next/dist/docs/`.
- **Sanity** (free plan) holds Sifna's projects and images. It is fetched at **build time** only.
- **Hosting**: Cloudflare Pages, one project per app, built from this repo (not set up yet).
  - Root directory `apps/<app>`, build command `npm run build`, output folder `out`.
  - When Sifna publishes in Sanity, a webhook calls the Cloudflare deploy hook to rebuild her site.
- Server code needed later (like an AI demo on Ashiq's site) goes in a Cloudflare Worker, not in Next.js.

## Static export

Both apps use `output: "export"` in `next.config.ts`. There is no Node server at runtime, so these Next.js features don't work:

- Server Actions, Route Handlers that read the request, Proxy (formerly middleware), `cookies()`, Draft Mode
- ISR and revalidation; new content appears only after a rebuild
- Dynamic routes without `generateStaticParams()`, or with `dynamicParams: true`
- `rewrites`, `redirects` and `headers` in `next.config.ts`
- `next/image` with the default loader for remote images
- `cacheComponents` and `partialPrefetching`; they break the build ("PPR cannot be enabled in export mode")

If a feature seems to need one of these, stop and ask.

## UI

- **Mobile first.** Most visitors open a portfolio link on their phone. Check every page at phone width.
- Pages must load fast: size images, lazy-load anything below the fold, and keep client JavaScript small.
- Components are Server Components by default. Add `"use client"` only when a component needs state, effects or browser APIs, and keep that component small.
- Use semantic HTML (`header`, `main`, `nav`, `section`) and give every image a real `alt` text.
- Style with Tailwind classes. Put shared colors and fonts in the app's theme in `app/globals.css`, not as raw values repeated across files.

## Code style

- Match the file you're in and the Next.js template's style.
- One component per file for anything reused; small private pieces can stay in the same file.
- Names say what a thing is: `projectSlug`, not `data` or `item`. Booleans read as a question: `isFeatured`, `hasGallery`.
- TypeScript: no `any`, and no `!` non-null assertions. Handle missing values with `?.`, `??` or an early return.
- Comments explain *why*, never *what*, in one short line. No section-label comments in short files, and no commented-out code.
- Delete unused code, imports and files in the same change.

## Run and check

Run commands inside the app folder (`apps/sifna` or `apps/ashiq`):

- `npm run dev`: local site at http://localhost:3000.
- `npm run build`: must pass. It also proves the static export still works.
- `npm run lint`: must show no new issues.

## Secrets and commits

- Keys and tokens go in `.env.local`, which git ignores. Never commit them. Sifna's site reads a public Sanity dataset, so it shouldn't need a token.
- Use Conventional Commits: `type(scope): summary`, e.g. `feat(sifna): add project gallery`. Types are `feat`, `fix`, `refactor` and `chore`; the scope is the app name.
- Only commit when asked.

## Before you finish

- `npm run build` and `npm run lint` pass in every app you changed.
- No feature from the [Static export](#static-export) list, and nothing that needs a paid plan.
- Pages look right at phone width and on desktop.
- Sifna's work comes from Sanity, not from code.
- You explained the change to Ashiq in plain words.
