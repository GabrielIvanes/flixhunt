import { Crew } from './crew.types';

export function getDirectors(crew: Crew[]) {
    return crew.filter((c) => c.job === 'Director');
}

export function getCrew(crew: Crew[]) {
    const crewFilter = new Map<number, Crew>();

    for (const c of crew) {
        const cf = crewFilter.get(c.id);

        if (cf) cf.job = `${cf.job}, ${c.job}`;
        else crewFilter.set(c.id, { ...c });
    }

    return Array.from(crewFilter.values());
}
