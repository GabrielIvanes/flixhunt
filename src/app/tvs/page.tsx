import { Configuration, TMDBResponse } from '@/types/tmdb-interfaces';
import { TvshowSummary } from '@/types/tvshow-interfaces';
import {
    Element as ElementInterface,
    Genre,
    Providers,
} from '@/types/global-interfaces';
import { mediaToElement } from '@/lib/utils';
import { getConfiguration, getGenres, getProviders } from '@/lib/tmdb';
import FiltersMedia from '@/components/filters-media';
import { getTopRatedTvshows } from '@/lib/tvshows';

export default async function Tvshows({
    searchParams,
}: {
    searchParams: Promise<{
        page: string;
        with_genres: string;
        decade: string;
        year: string;
        rate_gte: string;
        rate_lte: string;
        vote_gte: string;
        with_providers: string;
    }>;
}) {
    const defaultVoteGte = 400;

    const { page } = (await searchParams) || 1;
    const { with_genres } = (await searchParams) || '';
    const { decade } = (await searchParams) || '';
    const { year } = (await searchParams) || '';
    const { rate_gte } = (await searchParams) || '';
    const { rate_lte } = (await searchParams) || '';
    const { vote_gte } = (await searchParams) || `${defaultVoteGte}`;
    const { with_providers } = (await searchParams) || '';

    const configuration: Configuration = await getConfiguration();
    const genres: Genre[] = await getGenres('tv');
    const providers: Providers = await getProviders('tv');
    const tvshows: TMDBResponse<TvshowSummary> = await getTopRatedTvshows(
        'en-US',
        Number(page),
        with_genres,
        decade ? Number(decade) : undefined,
        year ? Number(year) : undefined,
        rate_gte,
        rate_lte,
        vote_gte,
        with_providers
    );
    const tvshowElements: ElementInterface[] = tvshows.results.map((tvshow) =>
        mediaToElement(
            tvshow.id,
            tvshow.name,
            tvshow.poster_path
                ? `${configuration.images.secure_base_url}w500${tvshow.poster_path}`
                : '',
            'tv',
            250,
            250 * 1.5,
            '',
            `${tvshow.name} ${tvshow.first_air_date ? '(' + tvshow.first_air_date.split('-')[0] + ')' : ''}`,
            true
        )
    );
    console.log(genres);
    console.log(tvshows);
    console.log(providers);

    return (
        <div className="pt-12 pb-5">
            <FiltersMedia
                mediaElements={tvshowElements}
                mediaType="tv"
                genres={genres}
                defaultVoteGte={defaultVoteGte}
                totalPages={tvshows.total_pages}
                providers={providers}
            />
        </div>
    );
}
