import type { ReactNode } from 'react';

import CardsCarousel from '@/shared/components/cards-carousel';
import { Season } from '@/entities/season/season.types';
import SeasonCard from '@/entities/season/components/season-card';

type Props = {
    seasons: Season[];
    loop?: boolean;
    title?: string;
    width?: number;
    getTooltip?: (season: Season) => ReactNode;
    getInfo?: (season: Season) => ReactNode;
};

export default function SeasonsCarousel({
    seasons,
    loop,
    title,
    width = 175,
    getTooltip,
    getInfo,
}: Props) {
    return (
        <CardsCarousel
            items={seasons}
            title={title}
            loop={loop}
            getKey={(season) => season.id}
            getTooltip={getTooltip}
            renderItem={(season) => (
                <SeasonCard
                    season={season}
                    href={`/tvshows/${season.tvshowId}/seasons/${season.seasonNumber}`}
                    width={width}
                    info={getInfo?.(season)}
                />
            )}
        />
    );
}
