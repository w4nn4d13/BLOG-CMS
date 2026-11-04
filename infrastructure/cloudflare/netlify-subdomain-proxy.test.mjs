import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './netlify-subdomain-proxy.mjs';

test('forwards encoded paths and repeated query arguments while preserving response security headers', async () => {
  const savedFetch = globalThis.fetch;
  let observed;
  globalThis.fetch = async (request, options) => {
    observed = { request, options };
    return new Response('content', { headers: { 'Content-Security-Policy': "default-src 'self'", 'Cache-Control': 'max-age=86400' } });
  };
  try {
    const response = await worker.fetch(new Request('https://advisory.w4nn4d13.in/advisories/path%20test/?ref=a%2Fb&ref=two'));
    assert.equal(observed.request.url, 'https://main--fluffy-nougat-9a448e.netlify.app/advisories/path%20test/?ref=a%2Fb&ref=two');
    assert.equal(observed.options.headers.get('Host'), 'main--fluffy-nougat-9a448e.netlify.app');
    assert.equal(observed.options.headers.get('X-Forwarded-Host'), 'advisory.w4nn4d13.in');
    assert.equal(observed.options.redirect, 'manual');
    assert.equal(response.headers.get('Content-Security-Policy'), "default-src 'self'");
    assert.equal(response.headers.get('Cache-Control'), 'max-age=86400');
    assert.equal(await response.text(), 'content');
  } finally { globalThis.fetch = savedFetch; }
});

test('keeps origin redirects on the public hostname', async () => {
  const savedFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(null, { status: 301, headers: { Location: 'https://attackgraph.w4nn4d13.tech/new/path?ref=test' } });
  try {
    const response = await worker.fetch(new Request('https://attackgraph.w4nn4d13.in/old'));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('Location'), 'https://attackgraph.w4nn4d13.in/new/path?ref=test');
  } finally { globalThis.fetch = savedFetch; }
});

test('does not proxy arbitrary hosts', async () => {
  const savedFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('unexpected request'); };
  try {
    for (const url of ['https://unrelated.example/', 'https://constructor/']) {
      assert.equal((await worker.fetch(new Request(url))).status, 404);
    }
  }
  finally { globalThis.fetch = savedFetch; }
});

test('returns an uncacheable error when the origin cannot be reached', async () => {
  const savedFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('private network detail'); };
  try {
    const response = await worker.fetch(new Request('https://advisory.w4nn4d13.in/'));
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.ok(!(await response.text()).includes('private network detail'));
  } finally { globalThis.fetch = savedFetch; }
});
