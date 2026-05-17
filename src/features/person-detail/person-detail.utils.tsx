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
