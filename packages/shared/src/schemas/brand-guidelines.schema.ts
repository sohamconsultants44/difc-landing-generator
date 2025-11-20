import { z } from 'zod';

export const BrandGuidelinesSchema = z.object({
  colors: z.object({
    primary: z.array(z.string()),
    secondary: z.array(z.string()),
    accent: z.array(z.string()),
    neutral: z.array(z.string()),
  }),
  typography: z.object({
    headings: z.object({
      family: z.array(z.string()),
      sizes: z.array(z.number()),
      weights: z.array(z.number()),
      lineHeights: z.array(z.number()),
    }),
    body: z.object({
      family: z.array(z.string()),
      sizes: z.array(z.number()),
      weights: z.array(z.number()),
      lineHeights: z.array(z.number()),
    }),
    captions: z.object({
      family: z.array(z.string()),
      sizes: z.array(z.number()),
      weights: z.array(z.number()),
      lineHeights: z.array(z.number()),
    }),
  }),
  spacing: z.object({
    xs: z.number(),
    sm: z.number(),
    md: z.number(),
    lg: z.number(),
    xl: z.number(),
    '2xl': z.number(),
    '3xl': z.number(),
  }),
  borderRadius: z.object({
    sm: z.number(),
    md: z.number(),
    lg: z.number(),
    full: z.number(),
  }),
  shadows: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
  }),
  logo: z.object({
    primary: z.string(),
    secondary: z.string(),
    minWidth: z.number(),
    clearSpace: z.number(),
  }),
  imagery: z.object({
    style: z.string(),
    filters: z.array(z.string()),
  }),
});

export type BrandGuidelines = z.infer<typeof BrandGuidelinesSchema>;

