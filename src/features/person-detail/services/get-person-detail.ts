import { mapTmdbPersonDetail } from '@/entities/person/person.mapper';
import { TmdbPersonDetailSchema } from '@/entities/person/person.schema';

export async function getPersonDetail(personId: number, language?: string) {
    let url = `${process.env.API_BASE_URL}/persons/${personId}`;
    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (!json.success)
        throw new Error(json.error ?? 'Failed to fetch person detail');

    const parsed = TmdbPersonDetailSchema.parse(json.data);

    return mapTmdbPersonDetail(parsed);
}
