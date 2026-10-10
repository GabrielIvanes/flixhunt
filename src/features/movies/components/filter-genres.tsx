import { Genre } from '@/entities/genre/genre.types';
import { Filters } from '@/shared/types/filters.types';
import { Button } from '@/shared/ui/button';
import { H2 } from '@/shared/ui/typography';

type Props = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    genres: Genre[];
};

export default function FilterGenres({
    filters,
    setFilters,
    genres,
}: Props) {
    

    return (
        <div>
            <H2>Genres</H2>
            <div className="flex gap-2 flex-wrap">
                {genres?.map((genre) => (
                    <Button
                        variant={
                            filters.selectedGenres.includes(genre.id)
                                ? 'default'
                                : 'ghost'
                        }
                        key={genre.id}
                        onClick={() => {
                            setFilters((prev) => ({
                                ...prev,
                                selectedGenres: prev.selectedGenres.includes(
                                    genre.id
                                )
                                    ? prev.selectedGenres.filter(
                                          (g) => g != genre.id
                                      )
                                    : [...prev.selectedGenres, genre.id],
                            }));
                        }}
                    >
                        {genre.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}
