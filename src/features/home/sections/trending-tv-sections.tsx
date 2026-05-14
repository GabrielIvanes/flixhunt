import TvshowsCarousel from '@/features/media/components/tvshows-carousel';
import { getTrendingTvshows } from '@/features/tvshow/services/get-trending-tvshows';

export default async function TrendingTvSection() {
    const trendingTvshows = await getTrendingTvshows();

    return (
        <div>
            <TvshowsCarousel
                tvshows={trendingTvshows.results}
                title="Trending TV Shows this week"
                loop={true}
            />
        </div>
    );
}
