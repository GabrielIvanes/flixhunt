import { TmdbMovieSchema } from '@/entities/movie/schemas/movie.schema';
import { TmdbTvshowSchema } from '@/entities/tvshow/tvshow.schema';
import { z } from 'zod';

export function CreateTmdbPaginatedResponseSchema<T extends z.ZodTypeAny>(
    itemSchema: T
) {
    return z.object({
        page: z.number(),
        results: z.array(itemSchema),
        total_pages: z.number(),
        total_results: z.number(),
    });
}

export const TmdbMoviesPaginatedResponseSchema =
    CreateTmdbPaginatedResponseSchema(TmdbMovieSchema);

export const TmdbTvshowPaginatedResponseSchema =
    CreateTmdbPaginatedResponseSchema(TmdbTvshowSchema);
