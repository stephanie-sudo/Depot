import type { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

const staticPages = [
  '/',
  '/about',
  '/sessions',
  '/faq',
  '/stories',
  '/contact',
  '/blog',
];

async function fetchBlogSlugs(req: NextRequest): Promise<string[]> {
  const protocol = req.headers.get('x-forwarded-proto') ?? 'https';
  const host = req.headers.get('host');
  if (!host) return [];
  try {
    const res = await fetch(`${protocol}://${host}/api/blog`);
    if (!res.ok) return [];
    return (await res.json()) as string[];
  } catch {
    return [];
  }
}

export default async function handler(req: NextRequest) {
  const protocol = req.headers.get('x-forwarded-proto') ?? 'https';
  const host = req.headers.get('host') ?? '';
  const baseUrl = `${protocol}://${host}`;
  const blogSlugs = await fetchBlogSlugs(req);
  const pages = [...staticPages, ...blogSlugs.map((slug) => `/blog/${slug}`)];
  const lastmod = new Date().toISOString();
  const urls = pages
    .map(
      (page) =>
        `<url><loc>${baseUrl}${page}</loc><lastmod>${lastmod}</lastmod></url>`
    )
    .join('');
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
  ].join('');
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=86400',
    },
  });
}
