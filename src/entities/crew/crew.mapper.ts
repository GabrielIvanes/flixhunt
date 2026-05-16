import type { Crew } from './crew.types';
import type { TmdbCrewDto } from './crew.schema';
import { buildUrl } from '@/lib/tmdb/tmdb.image';

export async function mapTmdbCrew(dto: TmdbCrewDto): Promise<Crew> {
    return {
        adult: dto.adult,
        gender: dto.gender,
        id: dto.id,
        knownForDepartment: dto.known_for_department,
        name: dto.name,
        originalName: dto.original_name,
        popularity: dto.popularity,
        profileUrl: await buildUrl(dto.profile_path),
        department: dto.department,
        job: dto.job,
        creditId: dto.credit_id,
    };
}
