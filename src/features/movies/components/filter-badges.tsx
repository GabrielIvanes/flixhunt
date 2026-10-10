'use client';

import { Genre } from '@/entities/genre/genre.types';
import { Providers } from '@/entities/media/types/media.types';
import { Filters } from '@/shared/types/filters.types';
import { Badge } from '@/shared/ui/badge';
import { useMemo } from 'react';

type Props = {
    filters: Filters;
    genres: Genre[];
    providers: Providers;
    defaultVoteGte: number;
};

export default function FilterBadges({
    filters,
    genres,
    providers,
    defaultVoteGte,
}: Props) {
    const providersMap = useMemo(() => {
        return new Map(providers?.results.map((p) => [p.providerId, p]) || []);
    }, [providers?.results]);

    return (
        <div className="flex gap-2 flew-wrap">
            {filters.selectProviders.length > 0 && (
                <Badge>
                    {'Providers: '}
                    {filters.selectProviders
                        .map((providerId: number) => {
                            const provider = providersMap.get(providerId);
                            return provider?.providerName;
                        })
                        .join(', ')}
                </Badge>
            )}
            {filters.selectedDecade && <Badge>{filters.selectedDecade}s</Badge>}
            {filters.selectedYear && <Badge>{filters.selectedYear}</Badge>}
            {filters.selectedGenres.length > 0 && (
                <Badge>
                    {'Genres: '}
                    {filters.selectedGenres
                        .map((genreId: number) => {
                            const genre = genres?.find((g) => g.id === genreId);
                            return genre?.name;
                        })
                        .join(', ')}
                </Badge>
            )}
            {(filters.selectedVoteAverage[0] > 1 ||
                filters.selectedVoteAverage[1] < 10) && (
                <Badge>
                    {filters.selectedVoteAverage[0] > 1 &&
                    filters.selectedVoteAverage[1] < 10
                        ? filters.selectedVoteAverage.join('-') + ' rating'
                        : filters.selectedVoteAverage[0] > 1
                          ? filters.selectedVoteAverage[0] + '+ rating'
                          : filters.selectedVoteAverage[1] + '- rating'}
                </Badge>
            )}
            {filters.selectedVoteCount[0] != defaultVoteGte && (
                <Badge>{filters.selectedVoteCount[0]}+ votes</Badge>
            )}
        </div>
    );
}
