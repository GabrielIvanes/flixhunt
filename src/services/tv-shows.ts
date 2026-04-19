export function getTvshowAirDates(firstAirDate: string, lastAirDate: string, status: string) {
    if (!firstAirDate) return null;
    if (!lastAirDate) return firstAirDate.slice(0, 4);

    if (
        (status.toLowerCase() === 'canceled' || status.toLowerCase() === 'stopped' || status.toLowerCase() === 'ended') && firstAirDate.split('-')[0] != lastAirDate.split('-')[0]
    ) {
        return `${firstAirDate.split('-')[0]} - ${lastAirDate.split('-')[0]}`;
    } else {
        return firstAirDate.split('-')[0];
    }
}