'use client';

import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';
import { useState } from 'react';
import HeroSection from './sections/hero-section';
import MediaComment from '../media-detail/components/media-comment';

type Props = {
    tvshow: TvshowDetail;
    width: number;
    countryCode: string;
};

export default function TvshowDetailClient({
    tvshow,
    width,
    countryCode,
}: Props) {
    const [comment, setComment] = useState<string | null>('This comment');

    return (
        <>
            <HeroSection
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
