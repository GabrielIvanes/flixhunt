import MediaActions from '@/features/media-detail/components/media-actions/media-actions';
import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';
import { getVoteAverage } from '@/features/movie-detail/movie-detail.utils';
import MediaOverview from '@/entities/media/components/media-overview';
import TvshowMetadata from '@/features/tvshow-detail/components/tvshow-metadata';
import TvshowCreators from '@/features/tvshow-detail/components/tvshow-creators';
import { H1 } from '@/shared/ui/typography';
import { EpisodeDetail } from '@/entities/episode/episode.types';
import EpisodeCard from '@/entities/episode/components/episode-card';

type Props = {
    episode: EpisodeDetail;
    tvshow: TvshowDetail;
    width: number;
    initialComment: string | null;
    onSaveComment: (comment: string | null) => void;
};
export default function HeroSection({
    episode,
    tvshow,
    width,
    initialComment,
    onSaveComment,
}: Props) {
    return (
        <section className="h-[calc(100vh-7.5rem)] w-full flex gap-5 px-10">
            <div className="flex justify-center items-center">
                <div
                    className="flex flex-col justify-between"
                >
                    <EpisodeCard episode={episode} width={width} />
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <div
                    className="w-full flex flex-col justify-between"
                >
                    <div className="flex flex-col gap-2">
                        <H1>{episode.name}</H1>
                        <TvshowMetadata
                            genres={tvshow.genres}
                            airDate={
                                episode.airDate
                                    ? episode.airDate.split('-')[0]
                                    : null
                            }
                            voteAverage={getVoteAverage(episode.voteAverage)}
                        />
                        <TvshowCreators tvshow={tvshow} />
                        <MediaOverview overview={episode.overview} />
                        <MediaActions
                            initialActions={{
                                video: null,
                                isFavorite: false,
                                isWatchlist: false,
                                isWatched: false,
                                isTheatreWatched: false,
                                listIds: [],
                                comment: initialComment,
                            }}
                            onSaveComment={onSaveComment}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
