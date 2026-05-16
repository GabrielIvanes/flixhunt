import { MovieDetail } from '@/entities/movie/types/movie.types';
import CastCarousel from '@/features/media/components/cast-carousel';
import { getCast } from '@/services/persons';

type Props = {
    movie: MovieDetail;
};

export default function CastSection({ movie }: Props) {
    const cast = getCast(movie.credits.cast);

    return (
        <section className="pb-5">
            <CastCarousel
                title="Cast"
                cast={cast}
                getInfo={(cast) => cast.name}
                getTooltip={(cast) => cast.character}
            />
        </section>
    );
}
