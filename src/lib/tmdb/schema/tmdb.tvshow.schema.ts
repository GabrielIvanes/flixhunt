import { TmdbTvshowSchema } from '@/entities/tvshow/tvshow.schema';
import { tmdbPaginatedResponseSchema } from '@/lib/tmdb/schema/tmdb.schema';

export const TmdbTvshowPaginatedResponseSchema =
    tmdbPaginatedResponseSchema(TmdbTvshowSchema);
