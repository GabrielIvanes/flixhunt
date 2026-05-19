import { CreditCrewBase } from '../credit/credit.types';
import { PersonCrewAggregateCredit } from '../person/person.types';
import { Crew } from './crew.types';

export function getDirectors<T extends CreditCrewBase>(crew: T[]): T[] {
    const directorIds = new Set(
        crew
            .filter((credit) => credit.job === 'Director')
            .map((credit) => credit.id)
    );
    const directorCredits = crew.filter((credit) => directorIds.has(credit.id));

    return mergeCrewJobs(directorCredits);
}

export function mergeCrewJobs<T extends CreditCrewBase>(crew: T[]): T[] {
    const crewFilter = new Map<number, T>();

    for (const c of crew) {
        const existingCrew = crewFilter.get(c.id);

        if (existingCrew) {
            if (c.job) existingCrew.job = `${existingCrew.job} / ${c.job}`;
        } else crewFilter.set(c.id, { ...c });
    }

    return Array.from(crewFilter.values());
}

export function crewAggregateCreditToCrew(
    aggregateCredit: PersonCrewAggregateCredit
): Crew {
    const job = aggregateCredit.jobs
        .map((r) => r.job)
        .filter(Boolean)
        .join(' / ');

    return {
        id: aggregateCredit.id,
        name: aggregateCredit.name,
        originalName: aggregateCredit.originalName,
        profileUrl: aggregateCredit.profileUrl,
        job: job,
        creditId: aggregateCredit.jobs[0]?.creditId || '',
        adult: aggregateCredit.adult,
        gender: aggregateCredit.gender,
        knownForDepartment: aggregateCredit.knownForDepartment,
        popularity: aggregateCredit.popularity,
        department: aggregateCredit.department,
    };
}
