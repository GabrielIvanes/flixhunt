import { GuestStar } from "../cast/cast.types";
import { Crew } from "../crew/crew.types";

export type EpisodeBase = {
    airDate: string;
    episodeNumber: number;
    id: number;
    name: string;
    overview: string;
    productionCode: string;
    runtime: number;
    seasonNumber: number;
    stillUrl: string | null;
    voteAverage: number;
    voteCount: number;
}

export type Episode = EpisodeBase & {
    episodeType: string | null;
    showId: number;
};

export type EpisodeDetail = EpisodeBase & {
    crew: Crew[];
    guestStars: GuestStar[];
}
