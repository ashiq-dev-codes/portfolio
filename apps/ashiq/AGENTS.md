<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Ashiq's portfolio

Rules for this app only. The rules for both apps, including the architecture, are in the [root AGENTS.md](../../AGENTS.md). [Sifna's app](../sifna/AGENTS.md) has the same sections.

## Content

- Ashiq is a developer, so his content lives in code instead of a CMS.
- Content files live in `infrastructure/content/` as typed data (`projects.ts`, `profile.ts`, ...), read through repository implementations (`ContentProjectRepository`, ...). Never write project text, links or skills inside components or pages.
- Keep the content files shaped like a CMS would return them and map them to domain types, the same way Sifna's app maps Sanity. Moving to Sanity later should only touch `infrastructure/`.
- Every project page is a dynamic route, so it needs `generateStaticParams()` that returns all project slugs from the project repository.

## Design

- Ashiq decides the look. Don't invent a visual style for a new page; follow the existing pages, and ask him if something isn't covered.
- The site shows a Flutter developer moving into AI engineering. His projects and what he built are the star; the motion and polish show developer craft without getting in the way.

## Images

- Images live in `public/images/`, already resized and compressed before they're added. Never commit a raw screenshot or a multi-MB export.
- Use modern formats (WebP or AVIF) for photos and screenshots, and SVG for logos and icons.
- Every image entry in the content files has its own `alt` text.
