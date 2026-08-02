export interface TocItem {
  depth: number;
  text: string;
  slug: string;
}

export function buildToc(headings: Array<{ depth: number; text: string; slug: string }>): TocItem[] {
  return headings.filter((h) => h.depth >= 2 && h.depth <= 4);
}
