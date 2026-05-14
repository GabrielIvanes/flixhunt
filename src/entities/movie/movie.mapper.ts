import { TmdbMovieDTO } from '@/lib/tmdb/types/tmdb.movie.types';
import { Movie } from '@/entities/movie/movie.types';
import { buildUrl } from '@/lib/tmdb/tmdb.image';

export async function mapTmdbMovie(dto: TmdbMovieDTO): Promise<Movie> {
    return {
        adult: dto.adult,
        backdropUrl: await buildUrl(dto.backdrop_path, 'w1280'),
        genreIds: dto.genre_ids,
        id: dto.id,
        originalLanguage: dto.original_language,
        originalTitle: dto.original_title,
        overview: dto.overview,
        popularity: dto.popularity,
        posterUrl: await buildUrl(dto.poster_path),
        releaseDate: dto.release_date,
        title: dto.title,
        video: dto.video,
        voteAverage: dto.vote_average,
        voteCount: dto.vote_count,
    };
}
