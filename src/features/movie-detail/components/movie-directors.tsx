import { Crew } from '@/entities/crew/crew.types';
import { getDirectors } from '@/entities/crew/crew.utils';
import { MovieDetail } from '@/entities/movie/types/movie.types';
import PointSeparator from '@/shared/ui/point-separator';
import { Accent, H2, P } from '@/shared/ui/typography';
import Link from 'next/link';

type Props = {
    movie: MovieDetail;
};

export default function MovieDirectors({ movie }: Props) {
    const directors: Crew[] = getDirectors(movie.credits.crew);

    if (directors.length === 0)
        return (
            <div>
                <H2 className="mb-1">Directors</H2>
                <P>There is no director provided.</P>
            </div>
        );

    return (
        <div>
            <H2 className="mb-1">Directors</H2>
            <div className="flex items-center gap-1">
                {directors.map((director, index: number) => (
                    <div key={director.id} className="flex items-center gap-1">
                        {index > 0 && <PointSeparator />}
                        <Link href={`/persons/${director.id}`} passHref>
                            <Accent>{director.name}</Accent>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
