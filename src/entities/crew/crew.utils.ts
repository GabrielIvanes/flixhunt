import { CreditCrewBase } from '../credit/credit.types';

export function getDirectors<T extends CreditCrewBase>(crew: T[]): T[] {
    return crew.filter((c) => c.job === 'Director');
}

export function mergeCrewJobs<T extends CreditCrewBase>(crew: T[]): T[] {
    const crewFilter = new Map<number, T>();

    for (const c of crew) {
        const existingCrew = crewFilter.get(c.id);

        if (existingCrew) {
            existingCrew.job = `${existingCrew.job}, ${c.job}`;
        } else {
            crewFilter.set(c.id, { ...c });
        }
    }

    return Array.from(crewFilter.values());
}
