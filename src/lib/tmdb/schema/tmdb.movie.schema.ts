import { TmdbMovieSchema } from '@/entities/movie/movie.schema';
import { tmdbPaginatedResponseSchema } from '@/lib/tmdb/schema/tmdb.schema';

export const TmdbMoviesPaginatedResponseSchema =
    tmdbPaginatedResponseSchema(TmdbMovieSchema);
