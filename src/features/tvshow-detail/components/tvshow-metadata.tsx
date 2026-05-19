import { Genre } from '@/entities/genre/genre.types';
import PointSeparator from '@/shared/ui/point-separator';
import { Accent, Muted } from '@/shared/ui/typography';
import Link from 'next/link';

type Props = {
    airDate?: string | null;
    numberOfSeasons?: number | null;
    numberOfEpisodes?: number | null;
    voteAverage?: number | null;
    genres: Genre[];
};

export default function TvshowMetadata({
    airDate,
    numberOfSeasons,
    numberOfEpisodes,
    voteAverage,
    genres,
}: Props) {
    const items = [
        airDate ? <Muted>{airDate}</Muted> : null,
        numberOfSeasons ? <Muted>{numberOfSeasons}s</Muted> : null,
        numberOfEpisodes ? <Muted>{numberOfEpisodes}ep</Muted> : null,
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
