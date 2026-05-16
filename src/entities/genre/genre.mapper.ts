import type { Genre } from './genre.types';
import type { TmdbGenreDto } from './genre.schema';

export function mapTmdbGenre(dto: TmdbGenreDto): Genre {
    return {
        id: dto.id,
        name: dto.name,
    };
}
