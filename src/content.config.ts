import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().optional(),
    description: z.string().min(1, 'Description is required').max(300, 'Description too long'),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('w4nn4d13'),
    category: z.string().default('Uncategorized'),
    tags: z.array(z.string()).default([]),
    hashtags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().nullable().default(null),
    cover: z.string().optional(),
    ogImage: z.string().optional(),
    canonical: z.string().url().optional().or(z.literal('')),
    toc: z.boolean().default(true),
    comments: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    noindex: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().min(1),
    role: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    social: z.object({
      github: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
    }).default({}),
  }),
});

export const collections = { posts, pages, authors };
