import { getCrew } from '@/entities/crew/crew.utils';
import { MovieDetail } from '@/entities/movie/types/movie.types';
import CrewCarousel from '@/features/media/components/crew-carousel';

type Props = {
    movie: MovieDetail;
};

export default function CrewSection({ movie }: Props) {
    const crew = getCrew(movie.credits.crew);

    return (
        <section className="pb-5">
            <CrewCarousel
                title="Cast"
                crew={crew}
                getInfo={(crew) => crew.name}
                getTooltip={(crew) => crew.job}
            />
        </section>
    );
}
