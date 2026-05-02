import { TMDBResponse } from '@/types/tmdb-interfaces';
import { MovieSummary, MovieDetail } from '@/types/movie-interfaces';

export async function getPopularMovies(
    language?: string,
    page?: number,
    region?: string
) {
    let url = `${process.env.API_BASE_URL}/movies/popular`;
    if (language) {
        if (url.includes('?')) url += `&language=${language}`;
        else url += `?language=${language}`;
    }
    if (page) {
        if (url.includes('?')) url += `&page=${page}`;
        else url += `?page=${page}`;
    }
    if (region) {
        if (url.includes('?')) url += `&region=${region}`;
        else url += `?region=${region}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const movies: TMDBResponse<MovieSummary> = json.data;
        return movies;
    } else {
        throw new Error(json.error);
    }
}

export async function getMovieDetails(movieId: string, language?: string) {
    let url = `${process.env.API_BASE_URL}/movies/${movieId}`;

    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const movie: MovieDetail = json.data;
        return movie;
    } else {
        throw new Error(json.error);
    }
}

export async function getTheatreMovies(language?: string, page?: number) {
    let url = `${process.env.API_BASE_URL}/movies/theatre`;
    if (language) {
        if (url.includes('?')) url += `&language=${language}`;
        else url += `?language=${language}`;
    }
    if (page) {
        if (url.includes('?')) url += `&page=${page}`;
        else url += `?page=${page}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const movies: TMDBResponse<MovieSummary> = json.data;
        return movies;
    } else {
        throw new Error(json.error);
    }
}

export async function getTopRatedMovies(
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
    const url = new URL(`${process.env.API_BASE_URL}/movies/top-rated`);

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
        const movies: TMDBResponse<MovieSummary> = json.data;
        return movies;
    } else {
        throw new Error(json.error);
    }
}

export async function getTrendingMovies(language?: string, page?: number) {
    const url = new URL(`${process.env.API_BASE_URL}/movies/trending`);
    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page.toString());
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const movies: TMDBResponse<MovieSummary> = json.data;
        return movies;
    } else {
        throw new Error(json.error);
    }
}
