import {PersonDetail} from "@/types/person-interfaces";

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