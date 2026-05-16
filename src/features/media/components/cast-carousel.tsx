import type { ReactNode } from 'react';

import CastCard from '@/entities/cast/components/cast-card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/shared/ui/carousel';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { H1 } from '@/shared/ui/typography';
import { Cast } from '@/entities/cast/cast.types';

type Props = {
    cast: Cast[];
    loop?: boolean;
    title?: string;
    width?: number;
    getTooltip?: (cast: Cast) => ReactNode;
    getInfo?: (cast: Cast) => ReactNode;
};

export default function CastCarousel({
    cast,
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
                    {cast.map((c) => {
                        const card = (
                            <CastCard
                                cast={c}
                                href={`/persons/${c.id}`}
                                width={width}
                                info={getInfo?.(c)}
                            />
                        );

                        return (
                            <CarouselItem
                                key={c.id}
                                className="basis-auto pl-3"
                            >
                                {getTooltip ? (
                                    <Tooltip>
                                        <TooltipTrigger render={card} />
                                        <TooltipContent>
                                            <div className="text-center">
                                                {getTooltip(c)}
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
