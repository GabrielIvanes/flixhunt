import { MovieBase } from '@/entities/movie/types/movie.types';
import { H2, P } from '@/shared/ui/typography';

type Props = {
    movie: MovieBase;
};

export default function MovieOverview({ movie }: Props) {
    return (
        <div className="flex flex-col min-h-0">
            <H2>Overview</H2>
            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                <P>
                    {movie.overview
                        ? movie.overview
                        : 'There is no overview provided.'}
                </P>
            </div>
        </div>
    );
}
