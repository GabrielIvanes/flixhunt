import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';
import TvshowsCarousel from '@/features/tvshow-detail/components/tvshows-carousel';

type Props = {
    tvshow: TvshowDetail;
};

export default function RecommendationSection({ tvshow }: Props) {
    return (
        <section className="pb-5">
            <TvshowsCarousel
                tvshows={tvshow.recommendations.results}
                title="Recommendations"
                loop={false}
            />
        </section>
    );
}
