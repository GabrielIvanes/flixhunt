import { Cast } from './cast.types';

export function getCast(cast: Cast[]) {
    const castFilter = new Map<number, Cast>();

    for (const c of cast) {
        const cf = castFilter.get(c.id);

        if (cf) cf.character = `${cf.character}, ${c.character}`;
        else castFilter.set(c.id, { ...c });
    }

    return Array.from(castFilter.values());
}
