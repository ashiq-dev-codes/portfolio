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
- [Firebase Hosting](https://firebase.google.com/docs/hosting) for both sites, one site each in the same project

## Structure

```text
portfolio/
├── apps/
│   ├── sifna/      # Sifna's site
│   └── ashiq/      # Ashiq's site
└── studio/         # Sanity Studio, where Sifna edits her work
```

Each app is its own npm project. There are no workspaces or shared packages.

## Run locally

Requires Node.js 20.9 or newer.

```bash
cd apps/sifna        # or apps/ashiq
npm install
npm run dev          # http://localhost:3000
```

To edit Sifna's content locally, run Sanity Studio:

```bash
cd studio
npm install
npm run dev          # http://localhost:3333
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local dev server |
| `npm run build` | Builds the static site into `out/` |
| `npm run lint` | Runs ESLint |

## Deploy

Both sites are on Firebase Hosting, in project `portfolio-as-11` owned by `ashiq.dev.codes@gmail.com`:

| App | URL | Firebase site |
| --- | --- | --- |
| [apps/ashiq](apps/ashiq) | https://ashiq.web.app | `ashiq` |
| [apps/sifna](apps/sifna) | https://sifna.web.app | `sifna` |

Each app's `firebase.json` names its site. To deploy one:

```bash
cd apps/ashiq                     # or apps/sifna
firebase login:list               # must show ashiq.dev.codes@gmail.com for this folder
npm run build
firebase deploy --only hosting
```

On a new machine, run `firebase login:use ashiq.dev.codes@gmail.com` once inside each app folder.

Rebuilding Sifna's site automatically when she publishes in Sanity is not set up yet.

## For contributors and AI agents

Project rules (static export limits, code style, what to check before finishing) are in [AGENTS.md](AGENTS.md).
