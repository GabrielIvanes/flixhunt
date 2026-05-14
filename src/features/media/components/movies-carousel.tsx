import type { ReactNode } from 'react';

import MovieCard from '@/entities/movie/components/movie-card';
import type { Movie } from '@/entities/movie/movie.types';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/shared/ui/carousel';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { H1 } from '@/shared/ui/typography';

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
    loop = false,
    title,
    width = 175,
    getTooltip,
    getInfo,
}: Props) {
    return (
        <section className="px-20">
            {title && <H1 className="mb-4">{title}</H1>}

            <Carousel
                opts={{
                    align: 'start',
                    loop,
                }}
            >
                <CarouselContent className="-ml-3">
                    {movies.map((movie) => {
                        const card = (
                            <MovieCard
                                movie={movie}
                                href={`/movies/${movie.id}`}
                                width={width}
                                info={getInfo?.(movie)}
                            />
                        );

                        return (
                            <CarouselItem
                                key={movie.id}
                                className="basis-auto pl-3"
                            >
                                {getTooltip ? (
                                    <Tooltip>
                                        <TooltipTrigger render={card} />
                                        <TooltipContent>
                                            <div className="text-center">
                                                {getTooltip(movie)}
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                ) : (
                                    card
                                )}
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
