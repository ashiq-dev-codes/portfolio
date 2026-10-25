# Agent Instructions

Rules for any coding agent (Claude Code, Cursor, Codex, Copilot, ...) working in this repo. Read this before touching code. If a rule is out of date, fix it in the same change.

## What this repo is

Two portfolio websites in one repo:

- **[apps/sifna](apps/sifna)**: the graphic design portfolio of Fathima Sifna. She is a designer, not a developer, and edits her own projects in Sanity. **Built first.**
- **[apps/ashiq](apps/ashiq)**: Ashiq's developer portfolio (Flutter developer moving into AI engineering). Its content lives in code.

Ashiq is the only developer, and he is learning Next.js with this repo. Explain what you change and why, using Flutter comparisons where they help. When he asks for a review, review; don't rewrite his code.

## Golden rules

1. **The experience comes first: super friendly, super attractive, full of motion.** These are portfolios, and visitors decide in the first few seconds whether to stay. Every page must look polished, be easy to use and come alive with smooth, purposeful animation. A page that works but looks plain is not done. See [UI and motion](#ui-and-motion).
2. **Free plans only.** No service, feature or package that needs a paid plan or a card.
3. **Static export only.** Every app must build to plain static files (see [Static export](#static-export)).
4. **Keep the code simple.** A rich experience doesn't need clever code. Small components, clear names. No shared packages, monorepo tools or abstractions until two apps really need the same code.
5. **Change only what the task needs.** No drive-by refactors, renames or reformatting.
6. **Don't guess.** If a requirement, design choice or content field is unclear, ask.

## Folder rules

Some folders have their own `AGENTS.md` with rules that only matter there:

| File | Covers |
| --- | --- |
| [apps/sifna/AGENTS.md](apps/sifna/AGENTS.md) | Content from Sanity, Sifna's design, Sanity images |
| [apps/ashiq/AGENTS.md](apps/ashiq/AGENTS.md) | Content in code, Ashiq's design, local images |

Both app files have the same sections, so the two apps stay mirror images. Next.js also writes a version notice between the `nextjs-agent-rules` markers in each one and re-adds it on `next dev`. Don't edit or delete that block; put app rules below it.

- Each rule lives in one file only: here if it applies to both apps, or in the app where someone would break it. Never copy a rule into both app files; move it here instead.
- When you add a rule to one app's file, check whether the other app needs its own version of it.
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

## Architecture

Both apps use the same simple, clean DDD layout. Only the data source differs: Sanity for Sifna, files in code for Ashiq.

```text
apps/<app>/
├── app/                              # routes only: page.tsx, layout.tsx
├── domain/                           # what a portfolio IS: plain TypeScript
│   ├── project/
│   │   ├── project.ts                # Project type + pure rules (sorting, featured, ...)
│   │   └── project-repository.ts     # interface: how the app asks for projects
│   └── profile/
│       ├── profile.ts                # name, bio, contact links, socials
│       └── profile-repository.ts
├── infrastructure/                   # where data COMES FROM
│   ├── sanity/  or  content/         # repository implementations + mappers
│   └── repositories.ts               # picks the implementations (like injection_container.dart)
└── ui/                               # how it LOOKS
    ├── components/                   # app-wide pieces: Button, Section, Reveal, ...
    └── project/                      # pieces for one domain: ProjectCard, ProjectGallery, ...
```

### Layers and who may import whom

| Layer | Holds | May import |
| --- | --- | --- |
| `domain/` | Types, pure rules, repository interfaces | Nothing outside `domain/`. No React, Next.js or Sanity. |
| `infrastructure/` | Repository implementations, data clients, mappers | `domain/` |
| `ui/` | Components that receive data as props | `domain/` (types only) and `ui/` |
| `app/` | Routes that fetch and compose | Everything: it is where the layers meet |

- **One folder per domain concept** (`project`, `profile`, later `category`, `experience`, ...), named with the words Sifna and Ashiq use. The same folder name appears in `domain/` and `ui/`.
- **Raw data never leaves `infrastructure/`.** A mapper turns each Sanity document or content entry into a domain type, and fills safe defaults for empty fields. Pages and components only ever see domain types.
- **Components never fetch.** Only routes in `app/` call repositories (from `infrastructure/repositories.ts`), at build time, and pass the results down as props.
- **Routes stay thin.** A `page.tsx` gets the data, then composes `ui/` sections. Markup and styling live in `ui/`.
- **Business rules live in `domain/`** as pure functions (like `sortByOrder` or `featuredFirst`), not inside components or mappers.
- **No application layer yet.** Pages call repositories and domain functions directly. Add `application/` use cases only when a page needs logic that combines several repositories.
- **Changing the data source touches only `infrastructure/`.** If Ashiq's content moves to Sanity one day, `domain/`, `ui/` and `app/` don't change.

### Naming

- Files and folders are kebab-case: `project-card.tsx`, `project-repository.ts`.
- One main export per file, named after the file: `project-card.tsx` exports `ProjectCard`.
- Repository interfaces are named after the concept (`ProjectRepository`); implementations are named after their source (`SanityProjectRepository`, `ContentProjectRepository`).
- Import with the `@/` alias (`@/domain/project/project`), never long `../../` paths.

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

## UI and motion

### Friendly

- Every page has an obvious next step (view work, open a project, get in touch). No dead ends; the 404 page is designed too and leads back.
- Everything clickable shows hover, focus and pressed states, and tap targets are at least 44px.
- Navigation is always easy to reach, including on phones.
- Contact is never more than one tap away.

### Attractive

- It must look designed, not like a template: strong typography, generous spacing, a clear visual hierarchy and one consistent theme.
- Images and work are shown large and sharp. Empty space is part of the design.
- Small details count: smooth corners, subtle shadows and borders, and consistent icon style.

### Motion

Every page should feel alive:

- **Entrances:** content animates in on first load (fade and rise, staggered for lists and grids).
- **Scroll:** sections and gallery items reveal as they scroll into view.
- **Hover and tap:** cards, images and buttons respond (lift, scale, image zoom, underline slide).
- **Page changes:** routes transition instead of jumping. Use React's `<ViewTransition>` (built into Next.js 16, no config; see `next/dist/docs/01-app/02-guides/view-transitions.md`). A project thumbnail should morph into its full image.

Rules that keep motion smooth instead of annoying:

- Motion guides attention; it never hides content or makes the visitor wait. Interactions take 150–300 ms, entrances up to about 800 ms, with ease-out curves.
- Animate only `transform` and `opacity`, so it stays at 60 fps on mid-range phones. Never animate width, height, top or left, and never cause layout shift.
- Respect `prefers-reduced-motion`: turn movement into simple fades, or switch it off.
- Use Tailwind or CSS transitions for hover and state changes. Use the `motion` package (Motion for React) for scroll reveals, staggers, gestures and layout animations. Don't add another animation library.
- Animated pieces are Client Components. Keep them as small wrappers (like `<Reveal>`) so pages stay Server Components.

### Fast and accessible

- **Mobile first.** Most visitors open a portfolio link on their phone. Check every page, and every animation, at phone width.
- Pages must load fast and keep client JavaScript small.
- Images: serve them at the size each layout needs, set width and height (or an aspect ratio) so the layout doesn't jump while they load, and lazy-load everything below the fold. Only the first visible image loads eagerly.
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
- New code sits in the right [layer](#architecture), and no layer imports one it shouldn't.
- Pages look polished and animate smoothly at phone width and on desktop, with reduced motion respected.
- Sifna's work comes from Sanity, not from code.
- You explained the change to Ashiq in plain words.
