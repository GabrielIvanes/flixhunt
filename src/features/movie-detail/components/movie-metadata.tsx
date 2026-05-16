import { Genre } from '@/entities/genre/genre.types';
import PointSeparator from '@/shared/ui/point-separator';
import { Accent, Muted } from '@/shared/ui/typography';
import Link from 'next/link';

type Props = {
    releaseDate?: string | null;
    duration?: string | null;
    voteAverage?: number | null;
    genres: Genre[];
};

export default function MovieMetadata({
    releaseDate,
    duration,
    voteAverage,
    genres,
}: Props) {
    const items = [
        releaseDate ? <Muted>{releaseDate}</Muted> : null,
        duration ? <Muted>{duration}</Muted> : null,
        voteAverage ? <Muted>{voteAverage}/10</Muted> : null,
        ...genres.map((genre) => (
            <Link key={genre.id} href={`/movies?with_genres=${genre.id}`}>
                <Accent>{genre.name}</Accent>
            </Link>
        )),
    ].filter(Boolean);

    return (
        <div className="flex flex-wrap items-center gap-1">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                    {index > 0 && <PointSeparator />}
                    {item}
                </div>
            ))}
        </div>
    );
}
