import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';
import SeasonsCarousel from '../components/seasons-carousel';

type Props = {
    tvshow: TvshowDetail;
};

export default function SeasonsSection({ tvshow }: Props) {
    return (
        <section className="pb-5">
            <SeasonsCarousel
                seasons={tvshow.seasons}
                title="Seasons"
                loop={false}
                getTooltip={(season) => `Season ${season.seasonNumber}  (${season.episodeCount} episodes)`}
                getInfo={(season) => season.name}
            />
        </section>
    );
}
