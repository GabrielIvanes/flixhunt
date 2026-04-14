import {MediaCastCredit, MediaCrewCredit} from "@/types/global-interfaces";

export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

export interface PersonDetail {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    combined_credits: CombinedCredits;
}

export interface CombinedCredits {
    id: number;
    cast: MediaCastCredit[];
    crew: MediaCrewCredit[];
}

export interface CastAggregateCredit {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    roles: {
        credit_id: string;
        character: string;
        episode_count: number;
    }[]
    total_episode_count: number;
    order: number;
}

export interface CrewAggregateCredit {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    jobs: {
        credit_id: string;
        job: string;
        episode_count: number;
    }[]
    department: string;
    total_episode_count: number;
}

export type Person = Cast | Crew | PersonDetail;
export type PersonAggregateCredit = CastAggregateCredit | CrewAggregateCredit;