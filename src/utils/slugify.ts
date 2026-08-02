export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeHashtag(ht: string): string {
  return ht
    .replace(/^#/, '')
    .toLowerCase()
    .trim();
}

export function displayHashtag(ht: string): string {
  return '#' + ht.replace(/^#/, '');
}
