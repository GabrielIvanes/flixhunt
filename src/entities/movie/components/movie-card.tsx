import { ReactNode } from 'react';
import { MovieCardBase } from '../types/movie.types';
import PosterCard from '@/shared/components/poster-card';

type Props = {
    movie: MovieCardBase;
    href?: string;
    info?: ReactNode;
    width?: number;
};
export default function MovieCard({ movie, href, info, width }: Props) {
    return (
        <PosterCard
            title={movie.title}
            imageUrl={movie.posterUrl}
            href={href}
            info={info}
            width={width}
        />
    );
}
