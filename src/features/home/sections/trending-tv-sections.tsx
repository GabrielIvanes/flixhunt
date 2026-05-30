import TvshowsCarousel from '@/features/tvshow-detail/components/tvshows-carousel';
import { getTrendingTvshows } from '@/features/tvshow/services/get-trending-tvshows';

export default async function TrendingTvSection() {
    const trendingTvshows = await getTrendingTvshows();

    return (
        <section>
            <TvshowsCarousel
                tvshows={trendingTvshows.results}
                title="Trending TV Shows this week"
                loop={true}
            />
        </section>
    );
}
