import {Person} from "@/types/person-interfaces";
import {MovieDetail} from "@/types/movie-interfaces";

export async function getPerson(personId: string, language?: string) {
    let url = `${process.env.API_BASE_URL}/persons/${personId}`;
    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    const json = await response.json();

    if (json.success) {
        const person: Person = json.data;
        return person;
    } else {
        throw new Error(json.error);
    }
}