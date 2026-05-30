'use client';

import { MovieDetail } from '@/entities/movie/types/movie.types';
import HeroSection from '@/features/movie-detail/sections/hero-section';
import MediaComment from '@/features/media-detail/components/media-comment';
import { useState } from 'react';

type Props = {
    movie: MovieDetail;
    width: number;
    countryCode: string;
};

export default function MovieDetailClient({
    movie,
    width,
    countryCode,
}: Props) {
    const [comment, setComment] = useState<string | null>('This comment');

    return (
        <>
            <HeroSection
                movie={movie}
                width={width}
                countryCode={countryCode}
                initialComment={comment}
                onSaveComment={setComment}
            />
            <MediaComment comment={comment} />
        </>
    );
}
