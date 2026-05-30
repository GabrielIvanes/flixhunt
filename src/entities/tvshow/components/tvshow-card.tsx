import { ReactNode } from 'react';
import { TvshowCardBase } from '../types/tvshow.types';
import PosterCard from '@/shared/components/poster-card';

type Props = {
    tvshow: TvshowCardBase;
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
