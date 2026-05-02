import { Filters } from '@/types/global-interfaces';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export function getTvshowAirDates(
    firstAirDate: string,
    lastAirDate: string,
    status: string
) {
    if (!firstAirDate) return null;
    if (!lastAirDate) return firstAirDate.slice(0, 4);

    if (
        (status.toLowerCase() === 'canceled' ||
            status.toLowerCase() === 'stopped' ||
            status.toLowerCase() === 'ended') &&
        firstAirDate.split('-')[0] != lastAirDate.split('-')[0]
    ) {
        return `${firstAirDate.split('-')[0]} - ${lastAirDate.split('-')[0]}`;
    } else {
        return firstAirDate.split('-')[0];
    }
}

export function handlePageChange(
    page: number,
    media: 'movies' | 'tvs' | 'persons',
    searchParams: ReadonlyURLSearchParams,
    router: AppRouterInstance
) {
    const params = new URLSearchParams(searchParams.toString());
    if (page != 1) params.set('page', page.toString());
    else params.delete('page');

    router.push(`/${media}${params.toString() ? `?${params.toString()}` : ''}`);
}

export function handleFilterChange(
    media: 'movies' | 'tvs' | 'persons',
    filters: Filters,
    defaultVoteGte: number,
    searchParams: ReadonlyURLSearchParams,
    router: AppRouterInstance
) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    if (filters.selectedGenres.length > 0)
        params.set('with_genres', filters.selectedGenres.join(','));
    else params.delete('with_genres');

    if (filters.selectedYear)
        params.set('year', filters.selectedYear.toString());
    else params.delete('year');

    if (filters.selectedDecade && !filters.selectedYear)
        params.set('decade', filters.selectedDecade.toString());
    else params.delete('decade');

    if (filters.selectedVoteAverage[0] === 1) params.delete('rate_gte');
    else params.set('rate_gte', filters.selectedVoteAverage[0].toString());
    if (filters.selectedVoteAverage[1] === 10) params.delete('rate_lte');
    else params.set('rate_lte', filters.selectedVoteAverage[1].toString());
    if (filters.selectedVoteCount[0] === defaultVoteGte)
        params.delete('vote_gte');
    else params.set('vote_gte', filters.selectedVoteCount[0].toString());

    if (filters.selectProviders.length > 0)
        params.set('with_providers', filters.selectProviders.join('|'));
    else params.delete('with_providers');

    router.push(`/${media}${params.toString() ? `?${params.toString()}` : ''}`);
}
