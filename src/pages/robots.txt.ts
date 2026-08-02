import { SITE } from '@/config/site';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const content = `User-agent: *
Allow: /

Sitemap: ${SITE.siteURL}/sitemap-index.xml
`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
