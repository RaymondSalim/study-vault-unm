import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const modules = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/modules' }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional().default(99),
    moduleTitle: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { modules };
