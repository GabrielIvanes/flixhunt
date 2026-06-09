import { mapTmdbSeasonDetail } from '@/entities/season/season.mapper';
import { TmdbSeasonDetailSchema } from '@/entities/season/season.schema';

export async function getSeasonDetail(
    tvshowId: number,
    seasonNumber: number,
    language?: string
) {
    let url = `${process.env.API_BASE_URL}/tvs/${tvshowId}/seasons/${seasonNumber}`;
    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (!json.success)
        throw new Error(json.error ?? 'Failed to fetch season detail');

    const parsed = TmdbSeasonDetailSchema.parse(json.data);

    return mapTmdbSeasonDetail(parsed, tvshowId, seasonNumber);
}
