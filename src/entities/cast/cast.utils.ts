import { CreditCastBase } from '../credit/credit.types';

export function mergeCastCharacters<T extends CreditCastBase>(cast: T[]): T[] {
    const castFilter = new Map<number, T>();

    for (const c of cast) {
        const existingCast = castFilter.get(c.id);

        if (existingCast) {
            existingCast.character = `${existingCast.character}, ${c.character}`;
        } else {
            castFilter.set(c.id, { ...c });
        }
    }

    return Array.from(castFilter.values());
}
