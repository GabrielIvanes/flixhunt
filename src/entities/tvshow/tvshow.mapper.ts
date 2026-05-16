import { TmdbTvshowDto } from '@/entities/tvshow/tvshow.schema';
import { buildUrl } from '@/lib/tmdb/tmdb.image';
import { Tvshow } from '@/entities/tvshow/tvshow.types';

export async function mapTmdbTvshow(dto: TmdbTvshowDto): Promise<Tvshow> {
    return {
        adult: dto.adult,
        backdropUrl: await buildUrl(dto.backdrop_path, 'w1280'),
        genreIds: dto.genre_ids,
        id: dto.id,
        originCountry: dto.origin_country,
        originalLanguage: dto.original_language,
        originalName: dto.original_name,
        overview: dto.overview,
        popularity: dto.popularity,
        posterUrl: await buildUrl(dto.poster_path),
        firstAirDate: dto.first_air_date,
        name: dto.name,
        voteAverage: dto.vote_average,
        voteCount: dto.vote_count,
    };
}
