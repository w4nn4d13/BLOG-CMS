export const SITE = {
  siteName: 'w4nn4d13',
  siteDescription: 'Security research, vulnerability writeups, CVE disclosures, and AI engineering by w4nn4d13.',
  siteURL: 'https://w4nn4d13.tech',
  author: 'w4nn4d13',
  authorRole: 'Security Researcher · AI Engineer',
  authorBio: 'Security researcher and AI engineer. Writing about vulnerability research, CVE disclosures, web security, agentic AI systems, and technical computing.',
  authorURL: 'https://w4nn4d13.tech',
  locale: 'en-US',
  timezone: 'UTC',

  postsPerPage: 10,
  relatedPostsCount: 3,
  excerptLength: 200,

  defaultOGImage: '/og-default.png',
  favicon: '/favicon.ico',

  navigation: [
    { label: 'HOME', href: '/' },
    { label: 'LATEST', href: '/latest/' },
    { label: 'CATEGORIES', href: '/categories/' },
    { label: 'ARCHIVE', href: '/archive/' },
    { label: 'ABOUT', href: '/about/' },
    { label: 'SEARCH', href: '/search/' },
  ],

  social: {
    github: 'https://github.com/w4nn4d13',
    twitter: '',
    linkedin: '',
    rss: '/rss.xml',
  },

  rss: {
    title: 'w4nn4d13 — Security Research',
    description: 'Security research, CVE disclosures, vulnerability writeups, and AI engineering.',
    feedItems: 20,
  },

  seo: {
    titleSeparator: ' — ',
    titleSuffix: 'w4nn4d13',
    twitterCard: 'summary_large_image' as const,
    twitterSite: '',
    keywords: 'security research, vulnerability research, CVE, bug bounty, web security, penetration testing, AI security, w4nn4d13',
  },

  analytics: {
    enabled: false,
    provider: '', // 'plausible' | 'umami' | 'goatcounter' | ''
    scriptSrc: '',
    dataId: '',
  },
} as const;

export type SiteConfig = typeof SITE;
