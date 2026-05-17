export function getPersonDate(
    birthDay: string | null,
    deathDay: string | null
) {
    if (!birthDay) return null;

    const firstDate = new Date(birthDay);
    const lastDate = deathDay ? new Date(deathDay) : new Date();

    let age = lastDate.getFullYear() - firstDate.getFullYear();

    if (lastDate.getMonth() - firstDate.getMonth() < 0) age -= 1;
    else if (
        lastDate.getMonth() - lastDate.getMonth() === 0 &&
        lastDate.getDate() - firstDate.getDate() < 0
    )
        age -= 1;

    if (!deathDay) return `${birthDay} (${age} years old)`;
    return `${birthDay} - ${deathDay} (${age} years old)`;
}

export function sortArray<
    T extends {
        voteAverage: number;
        voteCount: number;
        releaseDate?: string;
        firstAirDate?: string;
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
            const dateA = a.releaseDate
                ? new Date(a.releaseDate)
                : a.firstAirDate
                  ? new Date(a.firstAirDate)
                  : null;
            const dateB = b.releaseDate
                ? new Date(b.releaseDate)
                : b.firstAirDate
                  ? new Date(b.firstAirDate)
                  : null;

            if (!dateA || isNaN(dateA.getTime()))
                return order === 'ascending' ? -1 : 1;
            if (!dateB || isNaN(dateB.getTime()))
                return order === 'ascending' ? 1 : -1;

            return order === 'ascending'
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        });
    } else {
        return [...person].sort((a, b) => {
            const popularityA = a.voteAverage * a.voteCount;
            const popularityB = b.voteAverage * b.voteCount;

            return order === 'ascending'
                ? popularityA - popularityB
                : popularityB - popularityA;
        });
    }
}
