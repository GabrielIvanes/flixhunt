import type { ReactNode } from 'react';

import type { Crew } from '@/entities/crew/crew.types';
import PersonCard from '@/entities/person/components/person-card';
import CardsCarousel from '@/shared/components/cards-carousel';

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
    loop,
    title,
    width = 175,
    getTooltip,
    getInfo,
}: Props) {
    return (
        <CardsCarousel
            items={crew}
            title={title}
            loop={loop}
            getKey={(crew) => crew.id}
            getTooltip={getTooltip}
            renderItem={(crew) => (
                <PersonCard
                    person={crew}
                    href={`/persons/${crew.id}`}
                    width={width}
                    info={getInfo?.(crew)}
                />
            )}
        />
    );
}
