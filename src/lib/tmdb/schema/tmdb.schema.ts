import { z } from 'zod';

export function tmdbPaginatedResponseSchema<T extends z.ZodTypeAny>(
    itemSchema: T
) {
    return z.object({
        page: z.number(),
        results: z.array(itemSchema),
        total_pages: z.number(),
        total_results: z.number(),
    });
}
