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

type Props<T> = {
    items: T[];
    getKey: (item: T) => number;
    renderItem: (item: T) => ReactNode;
    loop?: boolean;
    title?: string;
    getTooltip?: (item: T) => ReactNode;
};

export default function CardsCarousel<T>({
    items,
    getKey,
    renderItem,
    loop = false,
    title,
    getTooltip,
}: Props<T>) {
    return (
        <section className="px-20">
            {title && <H1 className="mb-4">{title}</H1>}

            <Carousel opts={{ align: 'start', loop }}>
                <CarouselContent className="-ml-3">
                    {items.map((item) => {
                        const card = renderItem(item);
                        const tooltip = getTooltip?.(item);

                        return (
                            <CarouselItem
                                key={getKey(item)}
                                className="basis-auto pl-3"
                            >
                                {tooltip ? (
                                    <Tooltip>
                                        <TooltipTrigger
                                            render={<div>{card}</div>}
                                        />
                                        <TooltipContent>
                                            <div className="text-center">
                                                {tooltip}
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
