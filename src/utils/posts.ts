import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '@/config/site';
import { slugify, normalizeHashtag } from './slugify';

export type Post = CollectionEntry<'posts'>;

export async function getAllPosts(): Promise<Post[]> {
  const all = await getCollection('posts');
  // Compare date-only (not time) so posts dated "today" always appear regardless of timezone
  const todayStr = new Date().toISOString().slice(0, 10);

  return all
    .filter((p) => {
      if (p.data.draft) return false;
      const postDateStr = p.data.date.toISOString().slice(0, 10);
      if (postDateStr > todayStr) return false;
      return true;
    })
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllPostsIncludingDrafts(): Promise<Post[]> {
  const all = await getCollection('posts');
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getPostUrl(post: Post): string {
  const slug = post.data.slug || post.id.replace(/\.mdx?$/, '');
  return `/posts/${slug}/`;
}

export function paginate<T>(items: T[], page: number, perPage: number): {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
} {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    currentPage,
    totalPages,
    totalItems: total,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

export function getCategories(posts: Post[]): Array<{ name: string; slug: string; count: number }> {
  const map = new Map<string, number>();
  for (const p of posts) {
    const cat = p.data.category;
    map.set(cat, (map.get(cat) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count);
}

export function getTags(posts: Post[]): Array<{ name: string; slug: string; count: number }> {
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count);
}

export function getHashtags(posts: Post[]): Array<{ display: string; normalized: string; count: number }> {
  const map = new Map<string, { display: string; count: number }>();
  for (const p of posts) {
    for (const ht of p.data.hashtags) {
      const normalized = normalizeHashtag(ht);
      const existing = map.get(normalized);
      if (existing) {
        existing.count++;
      } else {
        map.set(normalized, { display: ht.replace(/^#/, ''), count: 1 });
      }
    }
  }
  return [...map.entries()]
    .map(([normalized, { display, count }]) => ({ display, normalized, count }))
    .sort((a, b) => b.count - a.count);
}

export function getSeries(posts: Post[]): Array<{ name: string; slug: string; count: number; posts: Post[] }> {
  const map = new Map<string, Post[]>();
  for (const p of posts) {
    if (p.data.series) {
      const existing = map.get(p.data.series);
      if (existing) existing.push(p);
      else map.set(p.data.series, [p]);
    }
  }
  return [...map.entries()]
    .map(([name, seriesPosts]) => ({
      name,
      slug: slugify(name),
      count: seriesPosts.length,
      posts: seriesPosts.sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getRelatedPosts(current: Post, all: Post[], count = SITE.relatedPostsCount): Post[] {
  const currentTags = new Set(current.data.tags.map((t) => slugify(t)));
  const currentCat = slugify(current.data.category);

  const scored = all
    .filter((p) => p.id !== current.id)
    .map((p) => {
      let score = 0;
      if (slugify(p.data.category) === currentCat) score += 3;
      for (const tag of p.data.tags) {
        if (currentTags.has(slugify(tag))) score += 2;
      }
      if (p.data.series && p.data.series === current.data.series) score += 4;
      return { post: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf());

  return scored.slice(0, count).map((x) => x.post);
}

export function getArchiveByYear(posts: Post[]): Map<number, Map<number, Post[]>> {
  const archive = new Map<number, Map<number, Post[]>>();
  for (const p of posts) {
    const year = p.data.date.getFullYear();
    const month = p.data.date.getMonth() + 1;
    if (!archive.has(year)) archive.set(year, new Map());
    const yearMap = archive.get(year)!;
    if (!yearMap.has(month)) yearMap.set(month, []);
    yearMap.get(month)!.push(p);
  }
  return archive;
}

export function formatDate(date: Date, format: 'long' | 'short' | 'iso' = 'long'): string {
  if (format === 'iso') return date.toISOString().slice(0, 10);
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
