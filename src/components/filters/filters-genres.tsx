import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';
import { Filters, Genre } from '@/types/global-interfaces';

interface Props {
    genres: Genre[];
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function filtersGenres({ genres, filters, setFilters }: Props) {
    return (
        <div className="mb-5">
            <H3 text="Genres" />
            <div className="flex gap-2 flex-wrap">
                {genres.map((genre) => (
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
