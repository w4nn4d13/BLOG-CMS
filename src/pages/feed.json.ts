import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { getAllPosts, getPostUrl } from '@/utils/posts';
import { SITE } from '@/config/site';
import type { APIContext } from 'astro';

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---[\s\S]*?---\n?/, '').trim();
}

export async function GET(_context: APIContext) {
  const posts = await getAllPosts();
  const siteUrl = SITE.siteURL.replace(/\/$/, '');

  const items = await Promise.all(
    posts.slice(0, SITE.rss.feedItems).map(async (post) => {
      const postUrl = siteUrl + getPostUrl(post);
      const bodyMarkdown = stripFrontmatter(post.body ?? '');
      const contentHtml = await markdownToHtml(bodyMarkdown);

      const pub = post.data.date.toISOString();
      const mod = (post.data.updated ?? post.data.date).toISOString();

      return {
        id: postUrl,
        url: postUrl,
        title: post.data.title,
        summary: post.data.description,
        content_html: contentHtml,
        author: { name: post.data.author },
        tags: [post.data.category, ...post.data.tags],
        date_published: pub,
        date_modified: mod,
      };
    })
  );

  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: SITE.siteName,
    description: SITE.siteDescription,
    home_page_url: siteUrl,
    feed_url: siteUrl + '/feed.json',
    user_comment: '',
    icon: '',
    author: { name: SITE.author },
    items,
  };

  return new Response(JSON.stringify(feed, null, 4), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
