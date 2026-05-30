import { getPopularTvshows } from '@/features/tvshow/services/get-popular-tvshows';
import TvshowsCarousel from '@/features/tvshow-detail/components/tvshows-carousel';

export default async function PopularTvSection() {
    const popularTvshows = await getPopularTvshows();

    return (
        <section>
            <TvshowsCarousel
                tvshows={popularTvshows.results}
                title="Popular TV Shows"
                loop={true}
            />
        </section>
    );
}
