import { mapTmdbTvshow } from '@/entities/tvshow/tvshow.mapper';
import { TmdbTvshowPaginatedResponseSchema } from '@/lib/tmdb/schema/tmdb.tvshow.schema';

export async function getTrendingTvshows(language?: string, page?: number) {
    const url = new URL(`${process.env.API_BASE_URL}/tvs/trending`);
    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page.toString());
    const response = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    const parsed = TmdbTvshowPaginatedResponseSchema.parse(json.data);
    const results = await Promise.all(parsed.results.map(mapTmdbTvshow));

    return {
        page: parsed.page,
        totalPages: parsed.total_pages,
        totalResults: parsed.total_results,
        results,
    };
}
