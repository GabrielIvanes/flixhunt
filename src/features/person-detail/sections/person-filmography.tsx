'use client';

import { mergeCastCharacters } from '@/entities/cast/cast.utils';
import { getDirectors, mergeCrewJobs } from '@/entities/crew/crew.utils';
import { PersonDetail } from '@/entities/person/person.types';
import { useMemo, useState } from 'react';
import { sortArray } from '../person-detail.utils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';
import MovieCard from '@/entities/movie/components/movie-card';
import { H1 } from '@/shared/ui/typography';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import TvshowCard from '@/entities/tvshow/components/tvshow-card';
import PersonFilmographySelects from '../components/person-filmography-selects';

type Props = {
    person: PersonDetail;
};

type Role = 'cast' | 'crew' | 'director';
type Sort =
    | 'year-descending'
    | 'year-ascending'
    | 'popularity-descending'
    | 'popularity-ascending';

export default function PersonFilmography({ person }: Props) {
    const [role, setRole] = useState<Role>(
        person.knownForDepartment === 'Acting'
            ? 'cast'
            : person.knownForDepartment === 'Directing'
              ? 'director'
              : 'crew'
    );
    const [sortBy, setSortBy] = useState<Sort>('popularity-descending');

    const castMedia = useMemo(
        () => mergeCastCharacters(person.combinedCredits.cast),
        [person.combinedCredits.cast]
    );

    const crewMedia = useMemo(
        () => mergeCrewJobs(person.combinedCredits.crew),
        [person.combinedCredits.crew]
    );

    const directorsMedia = useMemo(
        () => getDirectors(person.combinedCredits.crew),
        [person.combinedCredits.crew]
    );

    const media = useMemo(() => {
        switch (role) {
            case 'cast':
                return sortArray(sortBy, castMedia);
            case 'crew':
                return sortArray(sortBy, crewMedia);
            case 'director':
                return sortArray(sortBy, directorsMedia);
        }
    }, [role, sortBy, castMedia, crewMedia, directorsMedia]);

    return (
        <section className="pb-5">
            <PersonFilmographySelects
                role={role}
                setRole={setRole}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            {media && media.length > 0 ? (
                <div className="flex flex-wrap gap-5">
                    {media.map((m) => {
                        let card;
                        if (m.mediaType === 'movie') {
                            card = (
                                <MovieCard
                                    movie={m}
                                    href={`/movies/${m.id}`}
                                    width={175}
                                    info={
                                        m.releaseDate
                                            ? `${m.title} (${m.releaseDate.split('-')[0]})`
                                            : m.title
                                    }
                                />
                            );
                        } else {
                            card = (
                                <TvshowCard
                                    tvshow={m}
                                    href={`/tvshows/${m.id}`}
                                    width={175}
                                    info={m.name}
                                />
                            );
                        }

                        const tooltip =
                            'character' in m
                                ? `as ${m.character}`
                                : 'job' in m
                                  ? `as ${m.job}`
                                  : null;

                        return (
                            <div key={m.id}>
                                {tooltip ? (
                                    <Tooltip>
                                        <TooltipTrigger>{card}</TooltipTrigger>
                                        <TooltipContent>
                                            <p>{tooltip}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ) : (
                                    card
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <H1>{`${person.name} has not undertaken any projects as ${role === 'cast' ? 'actor' : role === 'crew' ? 'crewmate' : 'director'}.`}</H1>
            )}
        </section>
    );
}
