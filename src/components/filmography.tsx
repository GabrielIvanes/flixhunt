'use client'

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {CastCombinedCredits, CrewCombinedCredits, Person} from "@/types/person-interfaces"
import {Element as ElementInterface} from "@/types/global-interfaces"
import {useMemo, useState} from "react";
import {getCast, getCrew, getDirectors, sortArray} from "@/services/persons";
import {movieToElement, personToElement} from "@/lib/utils";
import Element from "@/components/ui/element";
import {Configuration} from "@/types/tmdb-interfaces";
import {H3} from "@/components/ui/typography";

interface Props {
    person: Person
    configuration: Configuration
}

export default function Filmography({person, configuration}: Props) {

    const [role, setRole] = useState<"cast" | "crew" | "director">(person.known_for_department === "Acting" ? "cast" : person.known_for_department === "Directing" ? "director" : "crew")
    const [sortBy, setSortBy] = useState<"year-descending" | "year-ascending" | "popularity-descending" | "popularity-ascending">("popularity-descending")

    const castMovies: CastCombinedCredits[] = getCast(person.combined_credits.cast)
    const crewMovies: CrewCombinedCredits[] = getCrew(person.combined_credits.crew)
    const directorMovies: CrewCombinedCredits[] = getDirectors(person.combined_credits.crew)

    const movieElements: ElementInterface = useMemo(() => {
        let data: CastCombinedCredits[] | CrewCombinedCredits[] = []

        if (role === "cast") data = castMovies
        else if (role === "crew") data = crewMovies
        else data = directorMovies

        data = sortArray(sortBy, data)

        return data.map((d) => movieToElement(d, configuration, 225, 225 * 1.5, true, true, false))
    }, [role, sortBy]);

    return (
        <>
            <div className="w-full flex gap-5 mb-5">
                <Select value={role} onValueChange={(value) => setRole(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent position={"popper"}>
                        <SelectGroup>
                            <SelectItem value="cast">Cast</SelectItem>
                            <SelectItem value="crew">Crew</SelectItem>
                            <SelectItem value="director">Director</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                    <SelectTrigger className="w-[220px]">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent position={"popper"}>
                        <SelectGroup>
                            <SelectItem value="year-descending">Year descending</SelectItem>
                            <SelectItem value="year-ascending">Year ascending</SelectItem>
                            <SelectItem value="popularity-descending">Popularity descending</SelectItem>
                            <SelectItem value="popularity-ascending">Popularity ascending</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {movieElements && movieElements.length > 0 ? <div className="flex flex-wrap gap-4">
                {movieElements.map(movieElement => (
                    <div key={movieElement.id}>
                        <Element element={movieElement}/>
                    </div>
                ))}
            </div> :
                <H3 text={`${person.name} has not undertaken any projects as ${role === "cast" ? "actor" : role === "crew" ? "crewmate" : "director" }.`}/>}

        </>
    );
}