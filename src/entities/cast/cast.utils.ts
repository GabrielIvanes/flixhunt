import { CreditCastBase } from '../credit/credit.types';
import { PersonCastAggregateCredit } from '../person/person.types';
import { Cast } from './cast.types';

export function mergeCastCharacters<T extends CreditCastBase>(cast: T[]): T[] {
    const castFilter = new Map<number, T>();

    for (const c of cast) {
        const existingCast = castFilter.get(c.id);

        if (existingCast) {
            existingCast.character = `${existingCast.character} / ${c.character}`;
        } else {
            castFilter.set(c.id, { ...c });
        }
    }

    return Array.from(castFilter.values());
}

export function castAggregateCreditToCast(
    aggregateCredit: PersonCastAggregateCredit
): Cast {
    const character = aggregateCredit.roles
        .map((r) => r.character)
        .filter(Boolean)
        .join(' / ');
    return {
        id: aggregateCredit.id,
        name: aggregateCredit.name,
        originalName: aggregateCredit.originalName,
        profileUrl: aggregateCredit.profileUrl,
        character: character,
        creditId: aggregateCredit.roles[0]?.creditId || '',
        order: aggregateCredit.order,
        adult: aggregateCredit.adult,
        gender: aggregateCredit.gender,
        knownForDepartment: aggregateCredit.knownForDepartment,
        popularity: aggregateCredit.popularity,
        castId: aggregateCredit.id,
    };
}
