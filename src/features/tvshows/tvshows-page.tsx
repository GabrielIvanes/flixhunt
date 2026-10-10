import { Genre } from '@/entities/genre/genre.types';
import { getGenres } from '../medias/services/get-genres';
import { getProviders } from '../medias/services/get-providers';
import { Providers } from '@/entities/media/types/media.types';
import { H3, Muted } from '@/shared/ui/typography';
import { MoviesPageParams } from '../movies/types/params.types';
import FiltersSection from '../movies/sections/filters-section';
import PaginationSection from '../movies/sections/pagination-section';
import { getTopRatedTvshows } from './services/get-top-rated-tvshows';
import TvshowsSection from './sections/tvshows-section';

type Props = {
    tvshowsPageParams: MoviesPageParams;
};

export default async function TvshowsPage({ tvshowsPageParams }: Props) {
    const language = 'en-US';

    const tvshows = await getTopRatedTvshows(tvshowsPageParams, language);
    const genres: Genre[] = await getGenres('tvshow');
    const providers: Providers = await getProviders('tvshow');

    return (
        <div>
            <FiltersSection
                defaultVoteGte={400}
                mediaType="tvshow"
                moviesPageParams={tvshowsPageParams}
                maxVoteCount={27000}
                stepVoteCount={200}
                genres={genres}
                providers={providers}
            />

            {tvshows.totalResults > 0 ? (
                <TvshowsSection tvshows={tvshows} />
            ) : (
                <section className="mx-auto flex min-h-80 max-w-xl flex-col items-center justify-center px-4 text-center">
                    <H3>No results found</H3>
                    <Muted className="mt-2">
                        No tv shows match these filters. Try removing some of
                        them.
                    </Muted>
                </section>
            )}

            {tvshows.totalResults > 0 && tvshows.totalPages > 1 && (
                <PaginationSection
                    defaultPage={tvshowsPageParams.page}
                    totalPages={tvshows.totalPages}
                    mediaType="tvshow"
                />
            )}
        </div>
    );
}
