import { buildUrl } from '@/lib/tmdb/tmdb.image';
import {
    TmdbEpisodeBaseDto,
    TmdbEpisodeDetailDto,
    TmdbEpisodeDto,
} from './episode.schema';
import { Episode, EpisodeBase, EpisodeDetail } from './episode.types';
import { mapTmdbCrew } from '../crew/crew.mapper';
import { mapTmdbGuestStar } from '../cast/cast.mapper';

export async function mapTmdbEpisodeBase(
    dto: TmdbEpisodeBaseDto
): Promise<EpisodeBase> {
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
        stillUrl: await buildUrl(dto.still_path, 'w500'),
    };
}

export async function mapTmdbEpisode(dto: TmdbEpisodeDto): Promise<Episode> {
    const episodeBase = await mapTmdbEpisodeBase(dto);
    return {
        ...episodeBase,
        episodeType: dto.episode_type,
        showId: dto.show_id,
    };
}

export async function mapTmdbEpisodeDetail(
    dto: TmdbEpisodeDetailDto
): Promise<EpisodeDetail> {
    const episodeBase = await mapTmdbEpisodeBase(dto);

    return {
        ...episodeBase,
        crew: await Promise.all(dto.crew.map(mapTmdbCrew)),
        guestStars: await Promise.all(dto.guest_stars.map(mapTmdbGuestStar)),
    };
}
