import { getTvshowDetail } from '@/features/tvshow-detail/services/get-tvshow-detail';
import MediaBackdrop from '@/entities/media/components/media-backdrop';
import CrewSection from '../movie-detail/sections/crew-section';
import CastSection from '../movie-detail/sections/cast-section';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { getSeasonDetail } from '../season-detail/services/get-season-details';
import EpisodeDetailClient from './episode-detail-client';
import { getEpisodeDetail } from './services/get-episode-detail';

type Props = {
    tvshowId: number;
    seasonNumber: number;
    episodeNumber: number;
};

export default async function EpisodeDetailPage({
    tvshowId,
    seasonNumber,
    episodeNumber,
}: Props) {
    const [episode, season, tvshow] = await Promise.all([
        getEpisodeDetail(tvshowId, seasonNumber, episodeNumber),
        getSeasonDetail(tvshowId, seasonNumber),
        getTvshowDetail(tvshowId),
    ]);

    const width: number = 500;

    console.log(episode);

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
                        <BreadcrumbLink
                            href={`/tvshows/${tvshowId}/seasons/${seasonNumber}`}
                            className="text-base"
                        >
                            {season.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            {episode.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <EpisodeDetailClient
                width={width}
                episode={episode}
                tvshow={tvshow}
            />
            <CastSection cast={episode.guestStars} />
            <CrewSection crew={episode.crew} />
        </div>
    );
}
