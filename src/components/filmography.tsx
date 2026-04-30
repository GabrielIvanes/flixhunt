'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PersonDetail } from '@/types/person-interfaces';
import {
    Element as ElementInterface,
    MediaCastCredit,
    MediaCrewCredit,
} from '@/types/global-interfaces';
import { useMemo, useState } from 'react';
import { getCast, getCrew, getDirectors, sortArray } from '@/services/persons';
import { mediaToElement } from '@/lib/utils';
import Element from '@/components/ui/element';
import { Configuration } from '@/types/tmdb-interfaces';
import { H3 } from '@/components/ui/typography';

interface Props {
    person: PersonDetail;
    configuration: Configuration;
}

export default function Filmography({ person, configuration }: Props) {
    const [role, setRole] = useState<'cast' | 'crew' | 'director'>(
        person.known_for_department === 'Acting'
            ? 'cast'
            : person.known_for_department === 'Directing'
              ? 'director'
              : 'crew'
    );
    const [sortBy, setSortBy] = useState<
        | 'year-descending'
        | 'year-ascending'
        | 'popularity-descending'
        | 'popularity-ascending'
    >('popularity-descending');

    const castMovies: MediaCastCredit[] = getCast(person.combined_credits.cast);
    const crewMovies: MediaCrewCredit[] = getCrew(person.combined_credits.crew);
    const directorMovies: MediaCrewCredit[] = getDirectors(
        person.combined_credits.crew
    );

    const movieElements: ElementInterface[] = useMemo(() => {
        let data: MediaCastCredit[] | MediaCrewCredit[] = [];

        if (role === 'cast') {
            data = sortArray(sortBy, castMovies);
        } else if (role === 'crew') {
            data = sortArray(sortBy, crewMovies);
        } else {
            data = sortArray(sortBy, directorMovies);
        }

        return data.map((d) =>
            mediaToElement(
                d.id,
                d.media_type === 'movie' ? d.title : d.name,
                d.poster_path
                    ? `${configuration.images.secure_base_url}w500${d.poster_path}`
                    : '',
                d.media_type,
                225,
                225 * 1.5,
                (d as MediaCastCredit).character
                    ? (d as MediaCastCredit).character
                    : (d as MediaCrewCredit).job,
                '',
                true
            )
        );
    }, [role, sortBy, configuration, castMovies, crewMovies, directorMovies]);

    return (
        <>
            <div className="w-full flex gap-5 mb-5">
                <Select
                    value={role}
                    onValueChange={(value: 'cast' | 'crew' | 'director') =>
                        setRole(value)
                    }
                >
                    <SelectTrigger className="w-45">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent position={'popper'}>
                        <SelectGroup>
                            <SelectItem value="cast">Cast</SelectItem>
                            <SelectItem value="crew">Crew</SelectItem>
                            <SelectItem value="director">Director</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    value={sortBy}
                    onValueChange={(
                        value:
                            | 'year-descending'
                            | 'year-ascending'
                            | 'popularity-descending'
                            | 'popularity-ascending'
                    ) => setSortBy(value)}
                >
                    <SelectTrigger className="w-55">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent position={'popper'}>
                        <SelectGroup>
                            <SelectItem value="year-descending">
                                Year descending
                            </SelectItem>
                            <SelectItem value="year-ascending">
                                Year ascending
                            </SelectItem>
                            <SelectItem value="popularity-descending">
                                Popularity descending
                            </SelectItem>
                            <SelectItem value="popularity-ascending">
                                Popularity ascending
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {movieElements && movieElements.length > 0 ? (
                <div className="flex flex-wrap gap-5">
                    {movieElements.map((movieElement) => (
                        <div key={movieElement.id}>
                            <Element element={movieElement} />
                        </div>
                    ))}
                </div>
            ) : (
                <H3
                    text={`${person.name} has not undertaken any projects as ${role === 'cast' ? 'actor' : role === 'crew' ? 'crewmate' : 'director'}.`}
                />
            )}
        </>
    );
}
