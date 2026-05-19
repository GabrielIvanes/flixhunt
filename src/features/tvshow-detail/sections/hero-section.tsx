import { H1, Lead } from '@/shared/ui/typography';
import MediaActions from '@/features/media/components/media-actions/media-actions';
import { getTrailer } from '@/entities/media/media.utils';
import TvshowCard from '@/entities/tvshow/components/tvshow-card';
import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';
import TvshowMetadata from '../components/tvshow-metadata';
import TvshowCreators from '../components/tvshow-creators';
import MediaProviders from '@/features/media-detail/components/media-providers';
import { getVoteAverage } from '@/features/movie-detail/movie-detail.utils';
import MediaOverview from '@/entities/media/components/media-overview';
import { getProviders } from '@/features/media-detail/media-detail.utils';
import { getTvshowAirDates } from '../tvshow-detail.utils';

type Props = {
    tvshow: TvshowDetail;
    width: number;
    countryCode: string;
    initialComment: string | null;
    onSaveComment: (comment: string | null) => void;
};
export default function HeroSection({
    tvshow,
    width,
    countryCode,
    initialComment,
    onSaveComment,
}: Props) {
    return (
        <section className="h-[calc(100vh-7.5rem)] w-full flex gap-5 px-10">
            <div className="flex items-center">
                <TvshowCard tvshow={tvshow} width={width} />
            </div>

            <div className="flex-1 flex justify-center items-center">
                <div
                    style={{ height: `${width * 1.5}px` }}
                    className="w-full flex flex-col justify-between"
                >
                    <div className="flex flex-col gap-2">
                        <H1>{tvshow.name}</H1>
                        <TvshowMetadata
                            genres={tvshow.genres}
                            airDate={getTvshowAirDates(
                                tvshow.firstAirDate,
                                tvshow.lastAirDate,
                                tvshow.status
                            )}
                            numberOfEpisodes={tvshow.numberOfEpisodes}
                            numberOfSeasons={tvshow.numberOfSeasons}
                            voteAverage={getVoteAverage(tvshow.voteAverage)}
                        />
                        <TvshowCreators tvshow={tvshow} />
                        <Lead>{tvshow.tagline}</Lead>
                        <MediaOverview overview={tvshow.overview} />
                        <MediaActions
                            initialActions={{
                                video: getTrailer(tvshow.videos),
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

                    <MediaProviders
                        providers={getProviders(
                            tvshow.watchProviders,
                            countryCode
                        )}
                    />
                </div>
            </div>
        </section>
    );
}
