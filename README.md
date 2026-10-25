# Portfolio

Two portfolio websites in one repo:

| App | Who | Content |
| --- | --- | --- |
| [apps/sifna](apps/sifna) | Fathima Sifna, graphic designer | Her projects and images, edited by her in Sanity Studio |
| [apps/ashiq](apps/ashiq) | Mohamed Ashiq, Flutter developer moving into AI engineering | Written in code |

Both sites are free to run: no paid plan or card is needed for any part of the stack.

## Stack

- [Next.js 16](https://nextjs.org) (App Router), TypeScript and Tailwind CSS 4
- Static export (`output: "export"`): every site builds to plain HTML, CSS and JS
- [Sanity](https://www.sanity.io) for Sifna's projects and images
- [Firebase Hosting](https://firebase.google.com/docs/hosting) for Ashiq's site, [Cloudflare Pages](https://pages.cloudflare.com) planned for Sifna's

## Structure

```text
portfolio/
├── apps/
│   ├── sifna/      # Sifna's site
│   └── ashiq/      # Ashiq's site
└── studio/         # Sanity Studio (coming soon)
```

Each app is its own npm project. There are no workspaces or shared packages.

## Run locally

Requires Node.js 20.9 or newer.

```bash
cd apps/sifna        # or apps/ashiq
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local dev server |
| `npm run build` | Builds the static site into `out/` |
| `npm run lint` | Runs ESLint |

## Deploy

### Ashiq's site (Firebase Hosting)

URL https://ashiq.web.app: site `ashiq` in Firebase project `portfolio-as-11`, owned by `ashiq.dev.codes@gmail.com`. The config is in [apps/ashiq/firebase.json](apps/ashiq/firebase.json).

```bash
cd apps/ashiq
firebase login:list               # must show ashiq.dev.codes@gmail.com for this folder
npm run build
firebase deploy --only hosting
```

### Sifna's site (Cloudflare Pages)

Not set up yet. The plan:

1. A Cloudflare Pages project connected to this repo, with root directory `apps/sifna`, build command `npm run build` and output folder `out`.
2. Build watch paths are limited to her app's folder, so a change to Ashiq's site doesn't rebuild hers.
3. When Sifna publishes in Sanity, a webhook calls the Cloudflare deploy hook and her site rebuilds.

## For contributors and AI agents

Project rules (static export limits, code style, what to check before finishing) are in [AGENTS.md](AGENTS.md).
