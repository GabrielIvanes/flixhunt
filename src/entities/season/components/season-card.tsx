import { ReactNode } from 'react';
import PosterCard from '@/shared/components/poster-card';
import { SeasonBase } from '../season.types';

type Props = {
    season: SeasonBase;
    href?: string;
    info?: ReactNode;
    width?: number;
};

export default function SeasonCard({ season, href, info, width = 175 }: Props) {
    return (
        <PosterCard
            title={season.name}
            imageUrl={season.posterUrl}
            href={href}
            info={info}
            width={width}
        />
    );
}
