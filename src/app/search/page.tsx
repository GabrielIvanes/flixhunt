import SearchMedia from '@/components/search-media';
import { searchMedia } from '@/lib/search';
import { getConfiguration } from '@/lib/tmdb';
import { mediaToElement } from '@/lib/utils';
import { MovieSummary } from '@/types/movie-interfaces';
import { PersonSummary } from '@/types/person-interfaces';
import { TMDBResponse } from '@/types/tmdb-interfaces';
import { TvshowSummary } from '@/types/tvshow-interfaces';
import { Element } from '@/types/global-interfaces';

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{
        query: string;
    }>;
}) {
    const { query } = await searchParams;

    const configuration = await getConfiguration();
    const movies: TMDBResponse<MovieSummary> = await searchMedia(
        query,
        'movies'
    );
    const tvs: TMDBResponse<TvshowSummary> = await searchMedia(query, 'tvs');
    const persons: TMDBResponse<PersonSummary> = await searchMedia(
        query,
        'persons'
    );
    const multi: TMDBResponse<
        | (MovieSummary & { media_type: 'movie' })
        | (TvshowSummary & { media_type: 'tv' })
        | (PersonSummary & { media_type: 'person' })
    > = await searchMedia(query, 'multi');

    const movieElements: Element[] = movies.results.map((movie) =>
        mediaToElement(
            movie.id,
            movie.title,
            movie.poster_path
                ? `${configuration.images.secure_base_url}w500${movie.poster_path}`
                : '',
            'movie',
            175,
            175 * 1.5,
            '',
            `${movie.title} ${movie.release_date ? '(' + movie.release_date.split('-')[0] + ')' : ''}`,
            true
        )
    );
    const tvshowElements: Element[] = tvs.results.map((tvshow) =>
        mediaToElement(
            tvshow.id,
            tvshow.name,
            tvshow.poster_path
                ? `${configuration.images.secure_base_url}w500${tvshow.poster_path}`
                : '',
            'tv',
            175,
            175 * 1.5,
            '',
            `${tvshow.name} ${tvshow.first_air_date ? '(' + tvshow.first_air_date.split('-')[0] + ')' : ''}`,
            true
        )
    );
    const personElements: Element[] = persons.results.map((person) =>
        mediaToElement(
            person.id,
            person.name,
            person.profile_path
                ? `${configuration.images.secure_base_url}w500${person.profile_path}`
                : '',
            'person',
            175,
            175 * 1.5,
            '',
            `${person.name}`,
            true
        )
    );
    const multiElements: Element[] = multi.results.map((m) =>
        mediaToElement(
            m.id,
            m.media_type === 'movie' ? m.title : m.name,
            m.media_type === 'movie' || m.media_type === 'tv'
                ? m.poster_path
                    ? `${configuration.images.secure_base_url}w500${m.poster_path}`
                    : ''
                : m.profile_path
                  ? `${configuration.images.secure_base_url}w500${m.profile_path}`
                  : '',
            m.media_type,
            175,
            175 * 1.5,
            '',
            m.media_type === 'movie'
                ? `${m.title} ${m.release_date ? '(' + m.release_date.split('-')[0] + ')' : ''}`
                : m.media_type === 'tv'
                  ? `${m.name} ${m.first_air_date ? '(' + m.first_air_date.split('-')[0] + ')' : ''}`
                  : m.name,
            true
        )
    );

    if (!query) {
        return (
            <div className="mt-30 px-10 w-full">
                <SearchMedia
                    movieElements={[]}
                    mediaElements={[]}
                    personElements={[]}
                    tvshowElements={[]}
                />
            </div>
        );
    }

    return (
        <div className="mt-30 px-10 relative w-full">
            <SearchMedia
                movieElements={movieElements}
                mediaElements={multiElements}
                personElements={personElements}
                tvshowElements={tvshowElements}
            />
        </div>
    );
}
