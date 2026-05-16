import { getConfiguration } from '@/lib/tmdb';
import { getSeasonDetail, getTvshowDetail } from '@/lib/tvshows';
import { SeasonDetail, TvshowDetail } from '@/types/tvshow-interfaces';
import { Element as ElementInterface } from '@/types/global-interfaces';
import { mediaToElement } from '@/shared/lib/utils';
import Image from 'next/image';
import Element from '@/shared/ui/element';
import {
    CastAggregateCredit,
    CrewAggregateCredit,
} from '@/types/person-interfaces';
import { getAggregateCast, getAggregateCrew } from '@/services/persons';
import { H1, H3, LinkP, MutedP, P } from '@/shared/ui/typography';
import { getTvshowAirDates } from '@/services/media';
import PointSeparator from '@/shared/ui/point-separator';
import Link from 'next/link';
import MediaActions from '@/components/media/media-actions';
import MediaProviders from '@/components/media/media-providers';
import MediaCarousels from '@/components/media/media-carousels';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

export default async function page({
    params,
}: {
    params: Promise<{ tvshowId: string; seasonNumber: string }>;
}) {
    const { tvshowId } = await params;
    const { seasonNumber } = await params;
    const width = 370;
    const height = 370 * 1.5;
    const countryCode = 'FR';

    const configuration = await getConfiguration();
    const tvshow: TvshowDetail = await getTvshowDetail(tvshowId);
    const season: SeasonDetail = await getSeasonDetail(tvshowId, seasonNumber);

    const tvShowElement: ElementInterface = mediaToElement(
        tvshow.id,
        tvshow.name,
        tvshow.poster_path
            ? `${configuration.images.secure_base_url}w500${tvshow.poster_path}`
            : '',
        'tv',
        '',
        width,
        height,
        '',
        ''
    );
    const seasonElement: ElementInterface = mediaToElement(
        season.id,
        season.name,
        season.poster_path
            ? `${configuration.images.secure_base_url}w500${season.poster_path}`
            : '',
        'season',
        '',
        width,
        height,
        '',
        ''
    );

    const airDate = getTvshowAirDates(
        tvshow.first_air_date,
        tvshow.last_air_date,
        tvshow.status
    );
    const voteAverage = tvshow.vote_average?.toPrecision(2);
    const providers = season['watch/providers']?.results[countryCode]?.flatrate;
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
    const episodeElements: ElementInterface[] = season.episodes.map((episode) =>
        mediaToElement(
            episode.id,
            episode.name,
            episode.still_path
                ? `${configuration.images.secure_base_url}w500${episode.still_path}`
                : '',
            'episode',
            `/tvs/${tvshowId}/seasons/${seasonNumber}/episodes/${episode.episode_number}`,
            150 * (16 / 9),
            150,
            `Episode ${episode.episode_number}`,
            episode.name
        )
    );
    const cast: CastAggregateCredit[] = getAggregateCast(
        season.aggregate_credits.cast
    );
    const crew: CrewAggregateCredit[] = getAggregateCrew(
        season.aggregate_credits.crew
    );
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
            c.roles && c.roles.length > 0
                ? c.roles.map((role) => role.character).join(', ')
                : '',
            ''
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
            c.jobs && c.jobs.length > 0
                ? c.jobs.map((job) => job.job).join(', ')
                : '',
            ''
        )
    );

    return (
        <div className="relative min-h-screen isolate w-full pt-24">
            <div className="fixed inset-0 -z-10 bg-neutral-900!">
                <Image
                    src={`${configuration.images.secure_base_url}original${tvshow.backdrop_path}`}
                    alt={tvshow.name}
                    fill={true}
                    sizes={'100vw'}
                    className="object-cover opacity-20"
                />
            </div>
            <Breadcrumb className="absolute border border-red-900 right-5 top-24 z-20">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/tvs/${tvshowId}`}>
                            {tvshow.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{season.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="relative w-full h-screen flex gap-4 z-10">
                <div className="flex justify-center items-center flex-1/3 pl-5">
                    <Element element={seasonElement} />
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
                            <H1 text={season.name} />
                            <div className="flex items-center gap-1 mb-2">
                                {airDate && (
                                    <div className="flex gap-1">
                                        <MutedP text={airDate} />
                                    </div>
                                )}
                                {season.episodes &&
                                    season.episodes.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            {airDate && <PointSeparator />}
                                            <MutedP
                                                text={`${season.episodes.length} ep`}
                                            />
                                        </div>
                                    )}

                                {voteAverage && (
                                    <div className="flex items-center gap-1">
                                        {(airDate ||
                                            (season.episodes &&
                                                season.episodes.length >
                                                    0)) && <PointSeparator />}
                                        <MutedP text={`${voteAverage}/10`} />
                                    </div>
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
                            <H3 text="Overview" />
                            <div className="min-h-0 overflow-y-auto pr-2">
                                <P
                                    text={
                                        season.overview
                                            ? season.overview
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
                episodeElements={episodeElements}
            />
        </div>
    );
}
