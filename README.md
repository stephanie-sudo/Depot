This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Install

```bash
pnpm install
```

## Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker

To run the production build using Docker compose:

```bash
docker compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## SEO endpoints

### `GET /api/blog`

Returns an array of blog post slugs sourced from the `blog/` directory. The sitemap fetches this endpoint to discover dynamic blog pages.

```bash
curl https://example.com/api/blog
# ["hello-world"]
```

### `GET /sitemap.xml`

Edge runtime that builds an XML sitemap containing static pages and `/blog/{slug}` entries. Responses are cached for one day via `Cache-Control: max-age=86400`.

```bash
curl https://example.com/sitemap.xml
# <?xml version="1.0" encoding="UTF-8"?>
# <urlset ...>
#   <url><loc>https://example.com/</loc><lastmod>2024-01-01T00:00:00.000Z</lastmod></url>
#   <url><loc>https://example.com/blog/hello-world</loc><lastmod>2024-01-01T00:00:00.000Z</lastmod></url>
# </urlset>
```

### `robots.txt`

A permissive robots file at `public/robots.txt` allows all crawlers and points to the sitemap:

```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

These endpoints help administrators and SEO tools keep the site indexed without manual updates.

