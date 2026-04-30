import { Badge } from '@/components/ui/badge';
import { Filters, Genre, Providers } from '@/types/global-interfaces';

interface Props {
    filters: Filters;
    providersMap: Map<number, Providers['results'][number]>;
    genres: Genre[];
    defaultVoteGte: number;
}

export default function FiltersBadges({
    filters,
    providersMap,
    genres,
    defaultVoteGte,
}: Props) {
    return (
        <div className="flex gap-2 flew-wrap">
            {filters.selectProviders.length > 0 && (
                <Badge>
                    {'Providers: '}
                    {filters.selectProviders
                        .map((providerId: number) => {
                            const provider = providersMap.get(providerId);
                            return provider?.provider_name;
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
                            const genre = genres.find((g) => g.id === genreId);
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
