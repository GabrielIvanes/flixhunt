import {Cast, MediaCastCredit, CombinedCredits, Crew, MediaCrewCredit} from "@/types/person-interfaces";
import {sort} from "eslint-config-next";

export function getCrew(crew: Crew[] | MediaCrewCredit[]): Crew[] | MediaCrewCredit {
    const crewFilter = new Map<number, Crew>();

    for (const c of crew) {
        const cf = crewFilter.get(c.id)

        if (cf) cf.job = `${cf.job}, ${c.job}`;
        else crewFilter.set(c.id, { ...c });
    }

    return Array.from(crewFilter.values());
}

export function getCast(cast: Cast[] | MediaCastCredit[]): Cast[] | CombinedCredits[] {
    const castFilter = new Map<number, Cast>();

    for (const c of cast) {
        const cf = castFilter.get(c.id)

        if (cf) cf.character = `${cf.character}, ${c.character}`;
        else castFilter.set(c.id, { ...c });
    }

    return Array.from(castFilter.values());
}

export function getDirectors(crew: Crew[] | MediaCrewCredit) {
    return crew.filter(c => c.job === "Director");
}

export function getAge(birthday: string, deathday: string | null) {
    if (!birthday) return null;

    const firstDate = new Date(birthday);
    const lastDate = deathday ? new Date(deathday) : new Date();

    let age = lastDate.getFullYear() - firstDate.getFullYear();

    if (lastDate.getMonth() - firstDate.getMonth() < 0) age -= 1;
    else if (lastDate.getMonth() - lastDate.getMonth() == 0 && lastDate.getDate() - firstDate.getDate() < 0) age -= 1;

    return `${age}`;
}

export function sortArray(sortBy: "year-descending" | "year-ascending" | "popularity-descending" | "popularity-ascending", person: MediaCastCredit[] | MediaCrewCredit[]) {
    const [field, order] = sortBy.split("-");

    let sortCombinedCredits: MediaCastCredit[] | MediaCrewCredit[] = [];

    if (field === "year") {

        return (person.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);

          if (isNaN(dateA)) return order === 'ascending' ? -1 : 1;
          if (isNaN(dateB)) return order === 'ascending' ? 1 : -1;

          return order === "ascending" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        }));
    } else {
        return person.sort((a, b) => {
            const popularityA = a.vote_average * a.vote_count
            const popularityB = b.vote_average * b.vote_count

            return  order === "ascending" ? popularityA - popularityB : popularityB - popularityA;
        })
    }
}