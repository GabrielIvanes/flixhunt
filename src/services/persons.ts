import {
    CastAggregateCredit,
    CrewAggregateCredit,
} from '@/types/person-interfaces';

export function getCrew<T extends { id: number; job: string }>(crew: T[]): T[] {
    const crewFilter = new Map<number, T>();

    for (const c of crew) {
        const cf = crewFilter.get(c.id);

        if (cf) cf.job = `${cf.job}, ${c.job}`;
        else crewFilter.set(c.id, { ...c });
    }

    return Array.from(crewFilter.values());
}

export function getAggregateCrew(crew: CrewAggregateCredit[]) {
    const crewFilter = new Map<number, CrewAggregateCredit>();

    for (const c of crew) {
        const cf = crewFilter.get(c.id);

        if (cf) {
            for (const job of cf.jobs) {
                if (!cf.jobs.some((j) => j.job === job.job)) cf.jobs.push(job);
            }
        } else crewFilter.set(c.id, { ...c, jobs: [...c.jobs] });
    }

    return Array.from(crewFilter.values());
}

export function getCast<T extends { id: number; character: string }>(
    cast: T[]
): T[] {
    const castFilter = new Map<number, T>();

    for (const c of cast) {
        const cf = castFilter.get(c.id);

        if (cf) cf.character = `${cf.character}, ${c.character}`;
        else castFilter.set(c.id, { ...c });
    }

    return Array.from(castFilter.values());
}

export function getAggregateCast(cast: CastAggregateCredit[]) {
    const castFilter = new Map<number, CastAggregateCredit>();

    for (const c of cast) {
        const cf = castFilter.get(c.id);

        if (cf) {
            for (const role of cf.roles) {
                if (!cf.roles.some((j) => j.character === role.character))
                    cf.roles.push(role);
            }
        } else castFilter.set(c.id, { ...c, roles: [...c.roles] });
    }

    return Array.from(castFilter.values());
}

export function getDirectors<T extends { job: string }>(crew: T[]): T[] {
    return crew.filter((c) => c.job === 'Director');
}

export function getAge(birthday: string, deathday: string | null) {
    if (!birthday) return null;

    const firstDate = new Date(birthday);
    const lastDate = deathday ? new Date(deathday) : new Date();

    let age = lastDate.getFullYear() - firstDate.getFullYear();

    if (lastDate.getMonth() - firstDate.getMonth() < 0) age -= 1;
    else if (
        lastDate.getMonth() - lastDate.getMonth() === 0 &&
        lastDate.getDate() - firstDate.getDate() < 0
    )
        age -= 1;

    return `${age}`;
}

export function sortArray<
    T extends {
        vote_average: number;
        vote_count: number;
        release_date?: string;
        first_air_date?: string;
    },
>(
    sortBy:
        | 'year-descending'
        | 'year-ascending'
        | 'popularity-descending'
        | 'popularity-ascending',
    person: T[]
) {
    const [field, order] = sortBy.split('-');

    if (field === 'year') {
        return [...person].sort((a, b) => {
            const dateA = a.release_date ? new Date(a.release_date) : a.first_air_date ? new Date(a.first_air_date) : null;
            const dateB = b.release_date ? new Date(b.release_date) : b.first_air_date ? new Date(b.first_air_date) : null;

            if (!dateA || isNaN(dateA.getTime())) return order === 'ascending' ? -1 : 1;
            if (!dateB || isNaN(dateB.getTime())) return order === 'ascending' ? 1 : -1;

            return order === 'ascending'
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        });
    } else {
        return [...person].sort((a, b) => {
            const popularityA = a.vote_average * a.vote_count;
            const popularityB = b.vote_average * b.vote_count;

            return order === 'ascending'
                ? popularityA - popularityB
                : popularityB - popularityA;
        });
    }
}
