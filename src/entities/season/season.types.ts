import { GuestStar } from '@/entities/cast/cast.types';
import { Crew } from '@/entities/crew/crew.types';
import { Episode } from '@/entities/episode/episode.types';
import { Network } from '@/entities/tvshow/types/tvshow.types';
import {
    PersonCastAggregateCredit,
    PersonCrewAggregateCredit,
} from '@/entities/person/person.types';
import { WatchProviderOptions } from '@/entities/media/types/media.types';

export type SeasonBase = {
    airDate: string | null;
    id: number;
    name: string;
    overview: string;
    posterUrl: string | null;
    seasonNumber: number;
    voteAverage: number;
};

export type Season = SeasonBase & {
    episodeCount: number;
    tvshowId: number;
};

export type SeasonDetail = SeasonBase & {
    episodes: SeasonEpisode[];
    networks: Network[];

    aggregateCredits: {
        cast: PersonCastAggregateCredit[];
        crew: PersonCrewAggregateCredit[];
    };

    watchProviders: Record<string, WatchProviderOptions>;
};

export type SeasonEpisode = Episode & {
    crew: Crew[];
    guestStars: GuestStar[];
    tvshowId: number;
    seasonNumber: number;
};
