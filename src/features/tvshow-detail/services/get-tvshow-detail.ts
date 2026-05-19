import { mapTmdbTvshowDetail } from '@/entities/tvshow/mappers/tvshow.mapper';
import { TmdbTvshowDetailSchema } from '@/entities/tvshow/schemas/tvshow-detail.schema';

export async function getTvshowDetail(tvshowId: number, language?: string) {
    let url = `${process.env.API_BASE_URL}/tvs/${tvshowId}`;
    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (!json.success)
        throw new Error(json.error ?? 'Failed to fetch tvshow detail');

    const parsed = TmdbTvshowDetailSchema.parse(json.data);

    return mapTmdbTvshowDetail(parsed);
}
