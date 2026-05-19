import type { ReactNode } from 'react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/shared/ui/carousel';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { H1 } from '@/shared/ui/typography';
import { Tvshow } from '@/entities/tvshow/types/tvshow.types';
import TvshowCard from '@/entities/tvshow/components/tvshow-card';

type Props = {
    tvshows: Tvshow[];
    loop?: boolean;
    title?: string;
    width?: number;
    getTooltip?: (tvshow: Tvshow) => ReactNode;
    getInfo?: (tvshow: Tvshow) => ReactNode;
};

export default function TvshowsCarousel({
    tvshows,
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
                    {tvshows.map((tvshow) => {
                        const card = (
                            <TvshowCard
                                tvshow={tvshow}
                                href={`/tvshows/${tvshow.id}`}
                                width={width}
                                info={getInfo?.(tvshow)}
                            />
                        );

                        return (
                            <CarouselItem
                                key={tvshow.id}
                                className="basis-auto pl-3"
                            >
                                {getTooltip ? (
                                    <Tooltip>
                                        <TooltipTrigger render={card} />
                                        <TooltipContent>
                                            <div className="text-center">
                                                {getTooltip(tvshow)}
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
