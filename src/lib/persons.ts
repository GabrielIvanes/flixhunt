import { PersonDetail, PersonSummary } from '@/types/person-interfaces';
import { TMDBResponse } from '@/types/tmdb-interfaces';

export async function getPerson(personId: string, language?: string) {
    let url = `${process.env.API_BASE_URL}/persons/${personId}`;
    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const person: PersonDetail = json.data;
        return person;
    } else {
        throw new Error(json.error);
    }
}

export async function getPopularPersons(language?: string, page?: number) {
    const url = new URL(`${process.env.API_BASE_URL}/persons/popular`);
    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page.toString());

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const person: TMDBResponse<PersonSummary> = json.data;
        return person;
    } else {
        throw new Error(json.error);
    }
}
