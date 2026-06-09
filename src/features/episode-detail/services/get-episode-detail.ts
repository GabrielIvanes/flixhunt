import { mapTmdbEpisodeDetail } from '@/entities/episode/episode.mapper';
import { TmdbEpisodeDetailSchema } from '@/entities/episode/episode.schema';

export async function getEpisodeDetail(
    tvshowId: number,
    seasonNumber: number,
    episodeNumber: number,
    language?: string
) {
    let url = `${process.env.API_BASE_URL}/tvs/${tvshowId}/seasons/${seasonNumber}/episodes/${episodeNumber}`;
    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (!json.success)
        throw new Error(json.error ?? 'Failed to fetch episode detail');

    const parsed = TmdbEpisodeDetailSchema.parse(json.data);

    return mapTmdbEpisodeDetail(parsed);
}
