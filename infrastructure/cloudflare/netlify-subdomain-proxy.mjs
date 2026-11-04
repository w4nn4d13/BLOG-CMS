// Keep the existing Netlify projects as the content origins. The branch aliases
// follow their normal Git deployments without requiring additional custom aliases.
const ORIGINS = Object.freeze({
  'advisory.w4nn4d13.in': 'main--fluffy-nougat-9a448e.netlify.app',
  'attackgraph.w4nn4d13.in': 'website--fluffy-donut-5ea1b7.netlify.app',
});

export default {
  async fetch(request) {
    const publicURL = new URL(request.url);
    const origin = ORIGINS[publicURL.hostname];
    if (!origin) return new Response('Not found', { status: 404 });

    const upstreamURL = new URL(request.url);
    upstreamURL.protocol = 'https:';
    upstreamURL.hostname = origin;
    upstreamURL.port = '';
    const headers = new Headers(request.headers);
    headers.set('Host', origin);
    headers.set('X-Forwarded-Host', publicURL.hostname);
    headers.set('X-Forwarded-Proto', 'https');

    try {
      const upstream = await fetch(new Request(upstreamURL, request), {
        headers,
        redirect: 'manual',
      });
      const response = new Response(upstream.body, upstream);
      const location = response.headers.get('Location');
      if (location) {
        const destination = new URL(location, upstreamURL);
        const oldHost = publicURL.hostname.replace(/\.in$/, '.tech');
        if ([origin, oldHost, publicURL.hostname].includes(destination.hostname)) {
          destination.protocol = 'https:';
          destination.hostname = publicURL.hostname;
          destination.port = '';
          response.headers.set('Location', destination.href);
        }
      }
      return response;
    } catch {
      return new Response('The website is temporarily unavailable.', {
        status: 502,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
  },
};
