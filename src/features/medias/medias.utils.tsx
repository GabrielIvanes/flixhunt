import { Filters } from '@/shared/types/filters.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export function resetFilters(
    setFilters: React.Dispatch<React.SetStateAction<Filters>>,
    router: AppRouterInstance,
    mediaType: 'movie' | 'tvshow' | 'person',
    defaultVoteGte: number
) {
    setFilters({
        selectedGenres: [],
        selectedDecade: null,
        selectedYear: null,
        selectedVoteAverage: [1, 10],
        selectedVoteCount: [defaultVoteGte],
        selectProviders: [],
    });

    router.push(`/${mediaType}s`);
}

export function cancelNewFilters(
    setFilters: React.Dispatch<React.SetStateAction<Filters>>,
    filtersFromParams: Filters
) {
    const prevFilters: Filters = {
        selectedGenres: filtersFromParams.selectedGenres,
        selectedDecade: filtersFromParams.selectedDecade,
        selectedYear: filtersFromParams.selectedYear,
        selectedVoteAverage: [
            filtersFromParams.selectedVoteAverage[0],
            filtersFromParams.selectedVoteAverage[1],
        ],
        selectedVoteCount: [filtersFromParams.selectedVoteCount[0]],
        selectProviders: filtersFromParams.selectProviders,
    };
    setFilters(prevFilters);
}

export function handleFilterChange(
    media: 'movie' | 'tvshow' | 'person',
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

    router.push(`/${media}s${params.toString() ? `?${params.toString()}` : ''}`);
}



