'use client';

import { useState } from 'react';
import MediaComment from '../media-detail/components/media-comment';
import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';
import { EpisodeDetail } from '@/entities/episode/episode.types';
import HeroSection from './sections/hero-section';

type Props = {
    episode: EpisodeDetail;
    tvshow: TvshowDetail;
    width: number;
};

export default function EpisodeDetailClient({
    episode,
    tvshow,
    width,
}: Props) {
    const [comment, setComment] = useState<string | null>('This comment');

    return (
        <>
            <HeroSection
                episode={episode}
                tvshow={tvshow}
                width={width}
                initialComment={comment}
                onSaveComment={setComment}
            />
            <MediaComment comment={comment} />
        </>
    );
}
