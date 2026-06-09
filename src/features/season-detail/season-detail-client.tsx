'use client';

import { useState } from 'react';
import MediaComment from '../media-detail/components/media-comment';
import HeroSection from './sections/hero-section';
import { SeasonDetail } from '@/entities/season/season.types';
import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';

type Props = {
    season: SeasonDetail;
    tvshow: TvshowDetail;
    width: number;
    countryCode: string;
};

export default function SeasonDetailClient({
    season,
    tvshow,
    width,
    countryCode,
}: Props) {
    const [comment, setComment] = useState<string | null>('This comment');

    return (
        <>
            <HeroSection
                season={season}
                tvshow={tvshow}
                width={width}
                countryCode={countryCode}
                initialComment={comment}
                onSaveComment={setComment}
            />
            <MediaComment comment={comment} />
        </>
    );
}
