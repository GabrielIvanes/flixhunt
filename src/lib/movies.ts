import {Configuration, TMDBResponse} from "@/types/tmdb-interfaces";
import {MovieSummary, MovieDetail} from "@/types/movie-interfaces";

export async function getPopularMovies(language?: string, page?: number) {
    let url = `${process.env.API_BASE_URL}/movies/popular`;
    if (language) {
        if (url.includes('?')) url += `&language=${language}`;
        else url += `?language=${language}`;
    }
    if (page) {
        if (url.includes('?')) url += `&page=${page}`;
        else url += `?page=${page}`;
    }

    const response = await fetch(url);
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
    const json = await response.json();

    if (json.success) {
        const movie: MovieDetail = json.data;
        return movie;
    } else {
        throw new Error(json.error);
    }
}