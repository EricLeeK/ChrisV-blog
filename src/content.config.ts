import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['AI 理论', 'Agent 实践与开发', 'AI 探索', '设计', '艺术', '岩土工程', '数理']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    externalUrl: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['AI Agents', 'NLP', 'Creative Coding', 'Design', 'Research Tools']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    link: z.string().optional(),
    website: z.string().url().optional(),
    openSource: z.boolean().default(false),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['论文', '工具', '灵感', '书架']),
    url: z.string().url(),
  }),
});

const random = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/random' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    mood: z.string().optional(),
    weather: z.string().optional(),
    cover: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

const blogArchive = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blogArchive' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    originalDate: z.coerce.date().optional(),
    category: z.string().default('博客转译'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    sourceUrl: z.string().url(),
    sourceAuthor: z.string(),
    sourceSite: z.string(),
    translator: z.string().optional(),
    htmlFile: z.string().optional(),
    snapshot: z.string().optional(),
  }),
});

export const collections = { articles, projects, resources, random, blogArchive };
