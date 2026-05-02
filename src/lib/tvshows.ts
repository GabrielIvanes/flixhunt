import { TMDBResponse } from '@/types/tmdb-interfaces';
import { TvshowDetail, TvshowSummary } from '@/types/tvshow-interfaces';

export async function getTvshowDetail(tvshowId: string, language?: string) {
    let url = `${process.env.API_BASE_URL}/tvs/${tvshowId}`;
    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const tvshow: TvshowDetail = json.data;
        return tvshow;
    } else {
        throw new Error(json.error);
    }
}

export async function getTopRatedTvshows(
    language?: string,
    page?: number,
    with_genres?: string,
    decade?: number,
    year?: number,
    rate_gte?: string,
    rate_lte?: string,
    vote_gte?: string,
    providers?: string
) {
    const url = new URL(`${process.env.API_BASE_URL}/tvs/top-rated`);

    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page.toString());
    if (with_genres) url.searchParams.set('with_genres', with_genres);
    if (decade) url.searchParams.set('decade', decade.toString());
    if (year) url.searchParams.set('year', year.toString());
    if (rate_gte) url.searchParams.set('rate_gte', rate_gte.toString());
    if (rate_lte) url.searchParams.set('rate_lte', rate_lte.toString());
    if (vote_gte) url.searchParams.set('vote_gte', vote_gte.toString());
    if (providers) url.searchParams.set('with_providers', providers.toString());

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const tvshows: TMDBResponse<TvshowSummary> = json.data;
        return tvshows;
    } else {
        throw new Error(json.error);
    }
}

export async function getTrendingTvshows(language?: string, page?: number) {
    const url = new URL(`${process.env.API_BASE_URL}/tvs/trending`);
    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page.toString());
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const tvshows: TMDBResponse<TvshowSummary> = json.data;
        return tvshows;
    } else {
        throw new Error(json.error);
    }
}

export async function getPopularTvshows(language?: string, page?: number) {
    const url = new URL(`${process.env.API_BASE_URL}/tvs/popular`);
    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page.toString());
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const tvshows: TMDBResponse<TvshowSummary> = json.data;
        return tvshows;
    } else {
        throw new Error(json.error);
    }
}
