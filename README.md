# Scarlet Skips Lab

An independent, English-language Scarlet Skips guide and Run Lab built with Next.js 16. Content is data-driven, versioned, and labeled by evidence strength.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production verification:

```bash
npm run lint
npm run build
```

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment. The fallback is `https://scarletskips.guide`; canonical URLs, Open Graph URLs, JSON-LD, robots and the sitemap all use this value.

## Structure

- `src/app`: thin App Router entry files and SEO route handlers
- `src/page`: page implementations
- `src/components`: shared UI and layout
- `src/data`: JSON content for game facts, upgrades, builds, guides, updates and sources
- `src/lib`: data access and recommendation logic
- `src/seo`: metadata and structured-data helpers
- `src/style`: global, shared and page-scoped styles
- `docs/data-maintenance.md`: content and source update workflow

Official images in `public/images/official` come from the Scarlet Skips Steam listing. The listing identifies the game copyright as © 2026 YerkDiff and lists Yerk Games as developer and publisher. This project is not affiliated with the developer, publisher or Valve.
