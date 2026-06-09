import { ReactNode } from 'react';
import PosterCard from '@/shared/components/poster-card';
import { TvshowBase } from '../types/tvshow.types';

type Props = {
    tvshow: TvshowBase;
    href?: string;
    info?: ReactNode;
    width?: number;
};

export default function TvshowCard({ tvshow, href, info, width = 175 }: Props) {
    return (
        <PosterCard
            title={tvshow.name}
            imageUrl={tvshow.posterUrl}
            href={href}
            info={info}
            width={width}
        />
    );
}
