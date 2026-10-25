<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sifna's portfolio

Rules for this app only. The repo-wide rules are in the [root AGENTS.md](../../AGENTS.md).

## Content comes from Sanity

- Sifna adds and edits her projects in Sanity Studio herself, without a developer. Never hardcode her projects, images or project text in this app.
- Fetch from Sanity at build time only. Her changes go live when the Sanity webhook triggers a rebuild.
- Every project page is a dynamic route, so it needs `generateStaticParams()` that returns all project slugs from Sanity.
- Treat every Sanity field except the slug as possibly empty. A missing description or gallery must not break the build or the page.
- When the site needs a new content field, add it to the schema in `studio/` first, then read it here.

## Design is Sifna's

- She is the designer. Follow her Figma file or her reference sites for layout, fonts, colors and spacing. Don't invent a visual style; ask Ashiq if something isn't covered.
- Her work is the focus. Keep the UI around it quiet and let the images be large.

## Images

- Her images are large design files. Always serve them from Sanity's image CDN at the size each layout needs, using its URL parameters for width, format and quality. Never use the original upload in a page.
- Set width and height (or an aspect ratio) on every image so the layout doesn't jump while it loads.
- Lazy-load gallery images below the fold; only the first visible image loads eagerly.
- `alt` text comes from the image's Sanity field. If it's empty, fall back to the project title.
