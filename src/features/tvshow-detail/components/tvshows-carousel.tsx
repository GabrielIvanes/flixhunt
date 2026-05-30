import type { ReactNode } from 'react';

import TvshowCard from '@/entities/tvshow/components/tvshow-card';
import type { Tvshow } from '@/entities/tvshow/types/tvshow.types';
import CardsCarousel from '@/shared/components/cards-carousel';

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
    loop,
    title,
    width = 175,
    getTooltip,
    getInfo,
}: Props) {
    return (
        <CardsCarousel
            items={tvshows}
            title={title}
            loop={loop}
            getKey={(tvshow) => tvshow.id}
            getTooltip={getTooltip}
            renderItem={(tvshow) => (
                <TvshowCard
                    tvshow={tvshow}
                    href={`/tvshows/${tvshow.id}`}
                    width={width}
                    info={getInfo?.(tvshow)}
                />
            )}
        />
    );
}
