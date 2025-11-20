import { z } from 'zod';

export const ExperimentDataSchema = z.object({
  experimentID: z.string(),
  experimentName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  variant: z.enum(['A', 'B', 'C']),
  testedElement: z.string(),
  elementType: z.enum(['headline', 'cta', 'image', 'form', 'layout']),
  description: z.string(),
  visitors: z.number(),
  conversions: z.number(),
  conversionRate: z.number(),
  confidenceLevel: z.number(),
  winner: z.boolean(),
  insights: z.string(),
  recommendations: z.string(),
});

export type ExperimentData = z.infer<typeof ExperimentDataSchema>;

