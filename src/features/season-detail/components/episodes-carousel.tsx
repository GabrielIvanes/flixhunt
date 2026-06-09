import type { ReactNode } from 'react';

import CardsCarousel from '@/shared/components/cards-carousel';
import { SeasonEpisode } from '@/entities/season/season.types';
import EpisodeCard from '@/entities/episode/components/episode-card';

type Props = {
    episodes: SeasonEpisode[];
    loop?: boolean;
    title?: string;
    width?: number;
    getTooltip?: (episode: SeasonEpisode) => ReactNode;
    getInfo?: (episode: SeasonEpisode) => ReactNode;
};

export default function EpisodesCarousel({
    episodes,
    loop,
    title,
    width = 250,
    getTooltip,
    getInfo,
}: Props) {
    return (
        <CardsCarousel
            items={episodes}
            title={title}
            loop={loop}
            getKey={(episode) => episode.id}
            getTooltip={getTooltip}
            renderItem={(episode) => (
                <EpisodeCard
                    episode={episode}
                    href={`/tvshows/${episode.tvshowId}/seasons/${episode.seasonNumber}/episodes/${episode.episodeNumber}`}
                    width={width}
                    info={getInfo?.(episode)}
                />
            )}
        />
    );
}
