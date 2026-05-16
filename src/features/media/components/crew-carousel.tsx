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
import { Crew } from '@/entities/crew/crew.types';
import CrewCard from '@/entities/crew/components/crew-card';

type Props = {
    crew: Crew[];
    loop?: boolean;
    title?: string;
    width?: number;
    getTooltip?: (crew: Crew) => ReactNode;
    getInfo?: (crew: Crew) => ReactNode;
};

export default function CrewCarousel({
    crew,
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
                    {crew.map((c) => {
                        const card = (
                            <CrewCard
                                crew={c}
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
