import MediaActions from '@/features/media-detail/components/media-actions/media-actions';
import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';
import MediaProviders from '@/features/media-detail/components/media-providers';
import { getVoteAverage } from '@/features/movie-detail/movie-detail.utils';
import MediaOverview from '@/entities/media/components/media-overview';
import { getProviders } from '@/features/media-detail/media-detail.utils';
import { SeasonDetail } from '@/entities/season/season.types';
import SeasonCard from '@/entities/season/components/season-card';
import TvshowMetadata from '@/features/tvshow-detail/components/tvshow-metadata';
import TvshowCreators from '@/features/tvshow-detail/components/tvshow-creators';
import { H1 } from '@/shared/ui/typography';

type Props = {
    season: SeasonDetail;
    tvshow: TvshowDetail;
    width: number;
    countryCode: string;
    initialComment: string | null;
    onSaveComment: (comment: string | null) => void;
};
export default function HeroSection({
    season,
    tvshow,
    width,
    countryCode,
    initialComment,
    onSaveComment,
}: Props) {
    return (
        <section className="h-[calc(100vh-7.5rem)] w-full flex gap-5 px-10">
            <div className="flex items-center">
                <SeasonCard season={season} width={width} />
            </div>

            <div className="flex-1 flex justify-center items-center">
                <div
                    style={{ height: `${width * 1.5}px` }}
                    className="w-full flex flex-col justify-between"
                >
                    <div className="flex flex-col gap-2">
                        <H1>{season.name}</H1>
                        <TvshowMetadata
                            genres={tvshow.genres}
                            airDate={
                                season.airDate
                                    ? season.airDate.split('-')[0]
                                    : null
                            }
                            numberOfEpisodes={
                                season.episodes.length > 0
                                    ? season.episodes.length
                                    : null
                            }
                            voteAverage={getVoteAverage(season.voteAverage)}
                        />
                        <TvshowCreators tvshow={tvshow} />
                        <MediaOverview overview={season.overview} />
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

                    <MediaProviders
                        providers={getProviders(
                            season.watchProviders,
                            countryCode
                        )}
                    />
                </div>
            </div>
        </section>
    );
}
