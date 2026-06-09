import { SeasonDetail } from '@/entities/season/season.types';
import EpisodesCarousel from '../components/episodes-carousel';

type Props = {
    season: SeasonDetail;
};

export default function EpisodeSection({ season }: Props) {
    return (
        <section className="pb-5">
            <EpisodesCarousel
                episodes={season.episodes}
                title="Episodes"
                loop={false}
                getTooltip={(episode) => `Episode ${episode.episodeNumber}`}
                getInfo={(episode) => episode.name}
            />
        </section>
    );
}
