import { buildUrl } from '@/lib/tmdb/tmdb.image';
import { TmdbEpisodeDto } from './episode.schema';
import { Episode } from './episode.types';

export async function mapTmdbEpisode(dto: TmdbEpisodeDto): Promise<Episode> {
    return {
        id: dto.id,
        name: dto.name,
        overview: dto.overview,
        voteAverage: dto.vote_average,
        voteCount: dto.vote_count,
        airDate: dto.air_date,
        episodeNumber: dto.episode_number,
        productionCode: dto.production_code,
        runtime: dto.runtime,
        seasonNumber: dto.season_number,
        showId: dto.show_id,
        stillUrl: await buildUrl(dto.still_path, 'w500'), // A MODIFIER SIZE
    };
}
