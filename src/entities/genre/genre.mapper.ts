import type { Genre } from './genre.types';
import type { TmdbGenreDto, TmdbGenresDto } from './genre.schema';

export function mapTmdbGenre(dto: TmdbGenreDto): Genre {
    return {
        id: dto.id,
        name: dto.name,
    };
}

export function mapTmdbGenres(dto: TmdbGenresDto): Genre[] {
  return dto.genres.map(mapTmdbGenre)
}