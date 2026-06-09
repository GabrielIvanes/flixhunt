import type { Cast, GuestStar } from './cast.types';
import type { TmdbCastDto, TmdbGuestStarDto } from './cast.schema';
import { buildUrl } from '@/lib/tmdb/tmdb.image';

export async function mapTmdbCast(dto: TmdbCastDto): Promise<Cast> {
    return {
        adult: dto.adult,
        gender: dto.gender,
        id: dto.id,
        knownForDepartment: dto.known_for_department,
        name: dto.name,
        originalName: dto.original_name,
        popularity: dto.popularity,
        profileUrl: await buildUrl(dto.profile_path),
        castId: dto.cast_id,
        character: dto.character,
        creditId: dto.credit_id,
        order: dto.order,
    };
}

export async function mapTmdbGuestStar(
    dto: TmdbGuestStarDto
): Promise<GuestStar> {
    return {
        adult: dto.adult,
        gender: dto.gender,
        id: dto.id,
        knownForDepartment: dto.known_for_department,
        name: dto.name,
        originalName: dto.original_name,
        popularity: dto.popularity,
        profileUrl: await buildUrl(dto.profile_path),
        character: dto.character,
        creditId: dto.credit_id,
        order: dto.order,
    };
}
