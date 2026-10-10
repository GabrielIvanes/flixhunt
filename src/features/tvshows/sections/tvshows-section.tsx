import MovieCard from '@/entities/movie/components/movie-card';
import TvshowCard from '@/entities/tvshow/components/tvshow-card';
import { Tvshow } from '@/entities/tvshow/types/tvshow.types';
import { PaginatedResponse } from '@/shared/types/paginated-response.types';

type Props = {
    tvshows: PaginatedResponse<Tvshow>;
};

export default function TvshowsSection({ tvshows }: Props) {
    return (
        <section className="flex flex-wrap gap-4 justify-center">
            {tvshows.results.map((tvshow) => (
                <div key={tvshow.id}>
                    <TvshowCard
                        tvshow={tvshow}
                        href={`/tvshows/${tvshow.id}`}
                        info={tvshow.name}
                        width={250}
                    />
                </div>
            ))}
        </section>
    );
}
