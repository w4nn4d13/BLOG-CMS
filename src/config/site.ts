export const SITE = {
  siteName: 'BLOG-CMS',
  siteDescription: 'Security research, AI engineering, and technical writing by w4nn4d13.',
  siteURL: 'https://blog.w4nn4d13.dev',
  author: 'w4nn4d13',
  authorRole: 'Security Researcher · AI Engineer',
  authorBio: 'Security researcher and AI engineer. Writing about vulnerability research, web security, agentic AI systems, and technical computing.',
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
    { label: 'TAGS', href: '/tags/' },
    { label: 'HASHTAGS', href: '/hashtags/' },
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
    title: 'BLOG-CMS — w4nn4d13',
    description: 'Security research, AI engineering, and technical writing.',
    feedItems: 20,
  },

  seo: {
    titleSeparator: ' — ',
    titleSuffix: 'BLOG-CMS',
    twitterCard: 'summary_large_image' as const,
    twitterSite: '',
  },

  analytics: {
    enabled: false,
    provider: '', // 'plausible' | 'umami' | 'goatcounter' | ''
    scriptSrc: '',
    dataId: '',
  },
} as const;

export type SiteConfig = typeof SITE;
