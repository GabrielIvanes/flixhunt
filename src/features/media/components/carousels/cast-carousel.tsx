import type { ReactNode } from 'react';

import type { Cast } from '@/entities/cast/cast.types';
import PersonCard from '@/entities/person/components/person-card';
import CardsCarousel from '@/shared/components/cards-carousel';

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
    loop,
    title,
    width = 175,
    getTooltip,
    getInfo,
}: Props) {
    return (
        <CardsCarousel
            items={cast}
            title={title}
            loop={loop}
            getKey={(cast) => cast.id}
            getTooltip={getTooltip}
            renderItem={(cast) => (
                <PersonCard
                    person={cast}
                    href={`/persons/${cast.id}`}
                    width={width}
                    info={getInfo?.(cast)}
                />
            )}
        />
    );
}
