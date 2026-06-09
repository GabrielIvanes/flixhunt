import { getTvshowDetail } from '@/features/tvshow-detail/services/get-tvshow-detail';
import { getSeasonDetail } from './services/get-season-details';
import MediaBackdrop from '@/entities/media/components/media-backdrop';
import SeasonDetailClient from './season-detail-client';
import CrewSection from '../movie-detail/sections/crew-section';
import CastSection from '../movie-detail/sections/cast-section';
import EpisodeSection from './sections/episode-section';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

type Props = {
    tvshowId: number;
    seasonNumber: number;
};

export default async function SeasonDetailPage({
    tvshowId,
    seasonNumber,
}: Props) {
    const [season, tvshow] = await Promise.all([
        getSeasonDetail(tvshowId, seasonNumber),
        getTvshowDetail(tvshowId),
    ]);

    const width: number = 370;
    const countryCode = 'FR';

    console.log(season);

    return (
        <div>
            <MediaBackdrop src={tvshow.posterUrl} alt={tvshow.name} />
            <Breadcrumb className="absolute left-10 top-24">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/tvshows/${tvshowId}`}
                            className="text-base"
                        >
                            {tvshow.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            {season.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <SeasonDetailClient
                width={width}
                countryCode={countryCode}
                season={season}
                tvshow={tvshow}
            />
            <EpisodeSection season={season} />
            <CastSection aggregateCast={season.aggregateCredits.cast} />
            <CrewSection aggregateCrew={season.aggregateCredits.crew} />
        </div>
    );
}
