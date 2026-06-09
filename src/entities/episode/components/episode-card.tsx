import { ReactNode } from 'react';
import PosterCard from '@/shared/components/poster-card';
import { EpisodeBase } from '../episode.types';

type Props = {
    episode: EpisodeBase;
    href?: string;
    info?: ReactNode;
    width?: number;
};

export default function EpisodeCard({
    episode,
    href,
    info,
    width = 250,
}: Props) {
    return (
        <PosterCard
            title={episode.name}
            imageUrl={episode.stillUrl}
            href={href}
            info={info}
            width={width}
            aspectClass="rectangle"
        />
    );
}
