import { getMovieDetails } from '@/lib/movies';
import { MovieDetail } from '@/types/movie-interfaces';
import Image from 'next/image';
import { Configuration } from '@/types/tmdb-interfaces';
import Element from '@/shared/ui/element';
import { formatTime, mediaToElement } from '@/shared/lib/utils';
import { getCast, getCrew, getDirectors } from '@/services/persons';
import { H1, H3, Lead, P } from '@/shared/ui/typography';
import { Element as ElementInterface, Genre } from '@/types/global-interfaces';
import PointSeparator from '@/shared/ui/point-separator';
import { Cast, Crew } from '@/types/person-interfaces';
import Link from 'next/link';
import MediaActions from '@/components/media/media-actions';
import MediaCarousels from '@/components/media/media-carousels';
import MediaProviders from '@/components/media/media-providers';

export default async function Movie({
    params,
}: {
    params: Promise<{ movieId: string }>;
}) {
    const { movieId } = await params;
    const width = 370;
    const height = 370 * 1.5;
    const countryCode = 'FR';

    const configuration: Configuration = await getConfiguration();
    const movie: MovieDetail = await getMovieDetails(movieId);

    const movieElement: ElementInterface = mediaToElement(
        movie.id,
        movie.title,
        movie.poster_path
            ? `${configuration.images.secure_base_url}w500${movie.poster_path}`
            : '',
        'movie',
        '',
        width,
        height,
        '',
        ''
    );
    const directors: Crew[] = getDirectors(movie.credits.crew);
    const release_date = movie.release_dates.results
        .find((result) => result.iso_3166_1 === countryCode)
        ?.release_dates?.find(
            (release_date) => release_date.type === 3
        )?.release_date;
    const releaseDate = release_date
        ? release_date.split('-')[0]
        : movie.release_date
          ? movie.release_date.split('-')[0]
          : '';
    const duration = formatTime(movie.runtime);
    const voteAverage = movie.vote_average?.toPrecision(2);
    const providers = movie['watch/providers']?.results[countryCode]?.flatrate;
    const providerElements: ElementInterface[] = providers?.map((provider) =>
        mediaToElement(
            provider.provider_id,
            provider.provider_name,
            provider.logo_path
                ? `${configuration.images.secure_base_url}w500${provider.logo_path}`
                : '',
            'provider',
            '',
            45,
            45,
            provider.provider_name,
            ''
        )
    );

    const cast: Cast[] = getCast(movie.credits.cast);
    const crew: Crew[] = getCrew(movie.credits.crew);
    const castElements: ElementInterface[] = cast.map((c) =>
        mediaToElement(
            c.id,
            c.name,
            c.profile_path
                ? `${configuration.images.secure_base_url}w500${c.profile_path}`
                : '',
            'person',
            `/persons/${c.id}`,
            175,
            175 * 1.5,
            c.character,
            c.name
        )
    );
    const crewElements: ElementInterface[] = crew.map((c) =>
        mediaToElement(
            c.id,
            c.name,
            c.profile_path
                ? `${configuration.images.secure_base_url}w500${c.profile_path}`
                : '',
            'person',
            `/persons/${c.id}`,
            175,
            175 * 1.5,
            c.job,
            c.name
        )
    );
    const recommendationElements: ElementInterface[] =
        movie.recommendations.results.map((recommendation) =>
            mediaToElement(
                recommendation.id,
                recommendation.media_type === 'movie'
                    ? recommendation.title
                    : recommendation.name,
                recommendation.poster_path
                    ? `${configuration.images.secure_base_url}w500${recommendation.poster_path}`
                    : '',
                recommendation.media_type,
                `/${recommendation.media_type}s/${recommendation.id}`,
                175,
                175 * 1.5,
                '',
                ''
            )
        );
    const similarElements: ElementInterface[] = movie.similar.results.map(
        (similar) =>
            mediaToElement(
                similar.id,
                similar.title,
                similar.poster_path
                    ? `${configuration.images.secure_base_url}w500${similar.poster_path}`
                    : '',
                'movie',
                `/movies/${movie.id}`,
                175,
                175 * 1.5,
                '',
                ''
            )
    );

    return (
        <>
            <div className="top-0 z-0 bg-neutral-900! fixed inset-0">
                <Image
                    src={`${configuration.images.secure_base_url}original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill={true}
                    sizes={'100vw'}
                    className="object-cover opacity-20"
                />
            </div>
            <div className="w-full h-screen flex gap-4 z-10 mt-0!">
                <div className="flex justify-center items-center flex-1/3 pl-5">
                    <Element element={movieElement} />
                </div>
                <div className="flex-2/3 flex justify-center items-center">
                    <div
                        className="mx-2 w-full flex flex-col justify-between"
                        style={{
                            height: `${height}px`,
                            maxHeight: `${height}px`,
                        }}
                    >
                        <div className="flex flex-col flex-1 min-h-0">
                            <H1 text={movieElement.name} />
                            <div className="flex items-center gap-1 mb-2">
                                {releaseDate && (
                                    <div className="flex gap-1">
                                        <MutedP text={releaseDate} />
                                    </div>
                                )}
                                {duration && (
                                    <div className="flex items-center gap-1">
                                        {releaseDate && <PointSeparator />}
                                        <MutedP text={duration} />
                                    </div>
                                )}
                                {voteAverage && (
                                    <div className="flex items-center gap-1">
                                        {(releaseDate || duration) && (
                                            <PointSeparator />
                                        )}
                                        <MutedP text={`${voteAverage}/10`} />
                                    </div>
                                )}
                                {movie.genres.map(
                                    (genre: Genre, index: number) => (
                                        <div
                                            className="flex items-center gap-1"
                                            key={genre.id}
                                        >
                                            {index === 0 ? (
                                                (releaseDate ||
                                                    duration ||
                                                    voteAverage) && (
                                                    <PointSeparator />
                                                )
                                            ) : (
                                                <PointSeparator />
                                            )}
                                            <Link
                                                href={`/movies?with_genres=${genre.id}`}
                                                passHref
                                            >
                                                <LinkP
                                                    text={genre.name}
                                                    classname="text-sm"
                                                />
                                            </Link>
                                        </div>
                                    )
                                )}
                            </div>
                            <H3 text="Directors" />
                            <div className="flex items-center">
                                {directors && directors.length > 0 ? (
                                    directors.map((director, index: number) => (
                                        <div key={director.id} className="flex">
                                            <Link
                                                href={`/persons/${director.id}`}
                                                passHref
                                            >
                                                <LinkP text={director.name} />
                                            </Link>
                                            {index != directors.length - 1 && (
                                                <span>,&nbsp;</span>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <P text="There is no director provided." />
                                )}
                            </div>
                            <Lead text={movie.tagline} />
                            <H3 text="Overview" />
                            <div className="min-h-0 overflow-y-auto pr-2">
                                <P
                                    text={
                                        movie.overview
                                            ? movie.overview
                                            : 'There is no overview provided.'
                                    }
                                />
                            </div>

                            <MediaActions showVideo={true} />
                        </div>
                        <MediaProviders providerElements={providerElements} />
                    </div>
                </div>
            </div>

            <MediaCarousels
                castElements={castElements}
                crewElements={crewElements}
                recommendationElements={recommendationElements}
                similarElements={similarElements}
            />
        </>
    );
}
