import type {
    TmdbPersonBaseDto,
    TmdbPersonCastAggregateCreditDto,
    TmdbPersonCombinedCastCreditDto,
    TmdbPersonCombinedCrewCreditDto,
    TmdbPersonCrewAggregateCreditDto,
    TmdbPersonDetailDto,
} from './person.schema';
import type {
    Person,
    PersonBase,
    PersonCastAggregateCredit,
    PersonCombinedCastCredit,
    PersonCombinedCrewCredit,
    PersonCrewAggregateCredit,
    PersonDetail,
} from './person.types';
import { buildUrl } from '@/lib/tmdb/tmdb.image';

export async function mapTmdbPersonBase(
    dto: TmdbPersonBaseDto
): Promise<PersonBase> {
    return {
        adult: dto.adult,
        gender: dto.gender,
        id: dto.id,
        knownForDepartment: dto.known_for_department,
        name: dto.name,
        popularity: dto.popularity,
        profileUrl: await buildUrl(dto.profile_path, 'w500'),
    };
}

export async function mapTmdbPerson(dto: TmdbPersonDetailDto): Promise<Person> {
    return {
        ...(await mapTmdbPersonBase(dto)),
        alsoKnownAs: dto.also_known_as,
        biography: dto.biography,
        birthday: dto.birthday,
        deathday: dto.deathday,
        homepage: dto.homepage,
        imdbId: dto.imdb_id,
        placeOfBirth: dto.place_of_birth,
    };
}

export async function mapTmdbPersonCombinedCastCredit(
    dto: TmdbPersonCombinedCastCreditDto
): Promise<PersonCombinedCastCredit> {
    const common = {
        id: dto.id,
        overview: dto.overview,
        posterUrl: await buildUrl(dto.poster_path, 'w500'),
        backdropUrl: await buildUrl(dto.backdrop_path, 'w1280'),
        voteAverage: dto.vote_average,
        voteCount: dto.vote_count,
        popularity: dto.popularity,
        genreIds: dto.genre_ids,
        character: dto.character,
        creditId: dto.credit_id,
    };

    if (dto.media_type === 'movie') {
        return {
            ...common,
            mediaType: 'movie',
            title: dto.title,
            originalTitle: dto.original_title,
            releaseDate: dto.release_date,
            order: dto.order,
        };
    }

    return {
        ...common,
        mediaType: 'tv',
        name: dto.name,
        originalName: dto.original_name,
        firstAirDate: dto.first_air_date,
        originCountry: dto.origin_country,
        episodeCount: dto.episode_count,
    };
}

export async function mapTmdbPersonCombinedCrewCredit(
    dto: TmdbPersonCombinedCrewCreditDto
): Promise<PersonCombinedCrewCredit> {
    const common = {
        id: dto.id,
        overview: dto.overview,
        posterUrl: await buildUrl(dto.poster_path, 'w500'),
        backdropUrl: await buildUrl(dto.backdrop_path, 'w1280'),
        voteAverage: dto.vote_average,
        voteCount: dto.vote_count,
        popularity: dto.popularity,
        genreIds: dto.genre_ids,
        creditId: dto.credit_id,
        department: dto.department,
        job: dto.job,
    };

    if (dto.media_type === 'movie') {
        return {
            ...common,
            mediaType: 'movie',
            title: dto.title,
            originalTitle: dto.original_title,
            releaseDate: dto.release_date,
        };
    }

    return {
        ...common,
        mediaType: 'tv',
        name: dto.name,
        originalName: dto.original_name,
        firstAirDate: dto.first_air_date,
        originCountry: dto.origin_country,
        episodeCount: dto.episode_count,
    };
}

export async function mapTmdbPersonDetail(
    dto: TmdbPersonDetailDto
): Promise<PersonDetail> {
    const person = await mapTmdbPerson(dto);

    return {
        ...person,
        combinedCredits: {
            cast: await Promise.all(
                dto.combined_credits.cast.map(mapTmdbPersonCombinedCastCredit)
            ),
            crew: await Promise.all(
                dto.combined_credits.crew.map(mapTmdbPersonCombinedCrewCredit)
            ),
        },
    };
}

export async function mapTmdbPersonCastAggregateCredit(
    dto: TmdbPersonCastAggregateCreditDto
): Promise<PersonCastAggregateCredit> {
    return {
        ...(await mapTmdbPersonBase(dto)),
        originalName: dto.original_name,
        roles: dto.roles.map((role) => ({
            creditId: role.credit_id,
            character: role.character,
            episodeCount: role.episode_count,
        })),
        totalEpisodeCount: dto.total_episode_count,
        order: dto.order,
    };
}

export async function mapTmdbPersonCrewAggregateCredit(
    dto: TmdbPersonCrewAggregateCreditDto
): Promise<PersonCrewAggregateCredit> {
    return {
        ...(await mapTmdbPersonBase(dto)),
        originalName: dto.original_name,
        jobs: dto.jobs.map((job) => ({
            creditId: job.credit_id,
            job: job.job,
            episodeCount: job.episode_count,
        })),
        department: dto.department,
        totalEpisodeCount: dto.total_episode_count,
    };
}
