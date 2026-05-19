import { buildUrl } from '@/lib/tmdb/tmdb.image';
import { TmdbSeasonDto } from './season.schema';
import { Season } from './season.types';

export async function mapTmdbSeason(dto: TmdbSeasonDto): Promise<Season> {
    return {
        airDate: dto.air_date,
        episodeCount: dto.episode_count,
        id: dto.id,
        name: dto.name,
        overview: dto.overview,
        posterUrl: await buildUrl(dto.poster_path, 'w500'),
        seasonNumber: dto.season_number,
        voteAverage: dto.vote_average,
    };
}
