import type { ReactNode } from 'react';

import MovieCard from '@/entities/movie/components/movie-card';
import type { Movie } from '@/entities/movie/types/movie.types';
import CardsCarousel from '@/shared/components/cards-carousel';

type Props = {
    movies: Movie[];
    loop?: boolean;
    title?: string;
    width?: number;
    getTooltip?: (movie: Movie) => ReactNode;
    getInfo?: (movie: Movie) => ReactNode;
};

export default function MoviesCarousel({
    movies,
    loop,
    title,
    width = 175,
    getTooltip,
    getInfo,
}: Props) {
    return (
        <CardsCarousel
            items={movies}
            title={title}
            loop={loop}
            getKey={(movie) => movie.id}
            getTooltip={getTooltip}
            renderItem={(movie) => (
                <MovieCard
                    movie={movie}
                    href={`/movies/${movie.id}`}
                    width={width}
                    info={getInfo?.(movie)}
                />
            )}
        />
    );
}
