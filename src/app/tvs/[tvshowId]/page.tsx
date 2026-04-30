import { getTvshowDetail } from '@/lib/tvshows';
import { TvshowDetail, TvshowSummary } from '@/types/tvshow-interfaces';
import Image from 'next/image';
import Element from '@/components/ui/element';
import { Element as ElementInterface, Genre } from '@/types/global-interfaces';
import { H1, H3, Lead, LinkP, MutedP, P } from '@/components/ui/typography';
import { mediaToElement } from '@/lib/utils';
import { Configuration } from '@/types/tmdb-interfaces';
import { getConfiguration } from '@/lib/tmdb';
import { getTvshowAirDates } from '@/services/media';
import PointSeparator from '@/components/ui/point-separator';
import Link from 'next/link';
import {
    CastAggregateCredit,
    CrewAggregateCredit,
} from '@/types/person-interfaces';
import { getAggregateCast, getAggregateCrew } from '@/services/persons';
import MediaCarousels from '@/components/media/media-carousels';
import MediaProviders from '@/components/media/media-providers';
import MediaActions from '@/components/media/media-actions';
import { MovieSummary } from '@/types/movie-interfaces';

export default async function Tvshow({
    params,
}: {
    params: Promise<{ tvshowId: string }>;
}) {
    const { tvshowId } = await params;
    const width = 370;
    const height = 370 * 1.5;
    const countryCode = 'FR';

    const configuration: Configuration = await getConfiguration();
    const tvshow: TvshowDetail = await getTvshowDetail(tvshowId);
    console.log(tvshow);

    const tvShowElement: ElementInterface = mediaToElement(
        tvshow.id,
        tvshow.name,
        tvshow.poster_path
            ? `${configuration.images.secure_base_url}w500${tvshow.poster_path}`
            : '',
        'tv',
        width,
        height,
        '',
        '',
        false
    );
    const airDate = getTvshowAirDates(
        tvshow.first_air_date,
        tvshow.last_air_date,
        tvshow.status
    );
    const voteAverage = tvshow.vote_average?.toPrecision(2);
    const providers = tvshow['watch/providers']?.results[countryCode]?.flatrate;
    const providerElements: ElementInterface[] = providers?.map((provider) =>
        mediaToElement(
            provider.provider_id,
            provider.provider_name,
            provider.logo_path
                ? `${configuration.images.secure_base_url}w500${provider.logo_path}`
                : '',
            'provider',
            45,
            45,
            provider.provider_name,
            '',
            false
        )
    );

    const cast: CastAggregateCredit[] = getAggregateCast(
        tvshow.aggregate_credits.cast
    );
    const crew: CrewAggregateCredit[] = getAggregateCrew(
        tvshow.aggregate_credits.crew
    );
    const castElements: ElementInterface[] = cast.map((c) =>
        mediaToElement(
            c.id,
            c.name,
            c.profile_path
                ? `${configuration.images.secure_base_url}w500${c.profile_path}`
                : '',
            'person',
            175,
            175 * 1.5,
            c.roles && c.roles.length > 0
                ? c.roles.map((role) => role.character).join(', ')
                : '',
            '',
            true
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
            175,
            175 * 1.5,
            c.jobs && c.jobs.length > 0
                ? c.jobs.map((job) => job.job).join(', ')
                : '',
            '',
            true
        )
    );
    const recommendationElements: ElementInterface[] =
        tvshow.recommendations.results.map((recommendation) =>
            mediaToElement(
                recommendation.id,
                recommendation.media_type === 'movie'
                    ? (recommendation as MovieSummary).title
                    : (recommendation as TvshowSummary).name,
                recommendation.poster_path
                    ? `${configuration.images.secure_base_url}w500${recommendation.poster_path}`
                    : '',
                recommendation.media_type,
                175,
                175 * 1.5,
                '',
                '',
                true
            )
        );

    console.log(castElements);

    return (
        <>
            <div className="top-0 z-0 bg-neutral-900! fixed inset-0">
                <Image
                    src={`${configuration.images.secure_base_url}original${tvshow.backdrop_path}`}
                    alt={tvshow.name}
                    fill={true}
                    sizes={'100vw'}
                    className="object-cover opacity-20"
                />
            </div>
            <div className="w-full h-screen flex gap-4 z-10">
                <div className="flex justify-center items-center flex-1/3 pl-5">
                    <Element element={tvShowElement} />
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
                            <H1 text={tvShowElement.name} />
                            <div className="flex items-center gap-1 mb-2">
                                {airDate && (
                                    <div className="flex gap-1">
                                        <MutedP text={airDate} />
                                    </div>
                                )}
                                {tvshow.number_of_seasons && (
                                    <div className="flex items-center gap-1">
                                        {airDate && <PointSeparator />}
                                        <MutedP
                                            text={`${tvshow.number_of_seasons}s`}
                                        />
                                    </div>
                                )}
                                {tvshow.number_of_episodes && (
                                    <div className="flex items-center gap-1">
                                        {(airDate ||
                                            tvshow.number_of_seasons) && (
                                            <PointSeparator />
                                        )}
                                        <MutedP
                                            text={`${tvshow.number_of_episodes}ep`}
                                        />
                                    </div>
                                )}
                                {voteAverage && (
                                    <div className="flex items-center gap-1">
                                        {(airDate ||
                                            tvshow.number_of_seasons ||
                                            tvshow.number_of_episodes) && (
                                            <PointSeparator />
                                        )}
                                        <MutedP text={`${voteAverage}/10`} />
                                    </div>
                                )}
                                {tvshow.genres.map(
                                    (genre: Genre, index: number) => (
                                        <div
                                            className="flex items-center gap-1"
                                            key={genre.id}
                                        >
                                            {index === 0 ? (
                                                (airDate ||
                                                    tvshow.number_of_seasons ||
                                                    tvshow.number_of_episodes ||
                                                    voteAverage) && (
                                                    <PointSeparator />
                                                )
                                            ) : (
                                                <PointSeparator />
                                            )}
                                            <Link
                                                href={`/tvs?with_genres=${genre.id}`}
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
                                {tvshow.created_by &&
                                tvshow.created_by.length > 0 ? (
                                    tvshow.created_by.map(
                                        (creator, index: number) => (
                                            <div
                                                key={creator.id}
                                                className="flex"
                                            >
                                                <Link
                                                    href={`/persons/${creator.id}`}
                                                    passHref
                                                >
                                                    <LinkP
                                                        text={creator.name}
                                                    />
                                                </Link>
                                                {index !=
                                                    tvshow.created_by.length -
                                                        1 && (
                                                    <span>,&nbsp;</span>
                                                )}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <P text="There is no director provided." />
                                )}
                            </div>
                            <Lead text={tvshow.tagline} />
                            <H3 text="Overview" />
                            <div className="min-h-0 overflow-y-auto pr-2">
                                <P
                                    text={
                                        tvshow.overview
                                            ? tvshow.overview
                                            : 'There is no overview provided.'
                                    }
                                />
                            </div>
                            <MediaActions showVideo={false} />
                        </div>
                        <MediaProviders providerElements={providerElements} />
                    </div>
                </div>
            </div>
            <MediaCarousels
                castElements={castElements}
                crewElements={crewElements}
                recommendationElements={recommendationElements}
            />
        </>
    );
}
