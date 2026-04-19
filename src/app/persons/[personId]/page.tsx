import {getPerson} from "@/lib/persons";
import {Element} from "@/components/ui/element";
import {personToElement} from "@/lib/utils";
import {Configuration} from "@/types/tmdb-interfaces";
import {getConfiguration} from "@/lib/tmdb";
import {H1, H3, MutedP, P} from "@/components/ui/typography";
import {getAge} from "@/services/persons";
import Separator from "@/components/ui/separator";
import Filmography from "@/components/filmography";
import Image from "next/image";

export default async function Person({params}: { params: Promise<{ personId: string }> }) {
    const {personId} = await params;
    const width = 370;
    const height = 370 * 1.5;

    const configuration: Configuration = await getConfiguration();
    const person = await getPerson(personId);
    const personElement = personToElement(person, configuration, width, height, false, false, false);
    console.log(person);

    const age = getAge(person.birthday, person.deathday);


    return (
        <>
            <div className="w-full h-screen flex gap-4 z-10">
                <div className="flex justify-center items-center flex-1/3 pl-5">
                    <Element element={personElement}/>
                </div>
                <div className="flex justify-center items-center flex-2/3 pr-16">
                    <div className="flex flex-col w-full flex-1 min-h-0"
                         style={{height: `${height}px`, maxHeight: `${height}px`}}>
                        <H1 text={person.name}/>
                        <div className="flex items-center gap-1 mb-2">
                            {age &&
                                <div>
                                    <MutedP text={`${person.deathday ? `(${person.birthday.split('-')[0]}-${person.deathday.split('-')[0]})` : ""} ${age} years old`}/>
                                </div>}
                            {person.known_for_department &&
                                <div className="flex items-center gap-1">
                                    {age && <Separator/>}
                                    <MutedP text={person.known_for_department}/>
                                </div>}
                            {person.place_of_birth &&
                                <div className="flex items-center gap-1">
                                    {(age || person.known_for_department) && <Separator/>}
                                    <MutedP text={person.place_of_birth}/>
                                </div>}
                        </div>
                        <H3 text="Biography"/>
                        <div className="min-h-0 overflow-y-auto pr-2 my-2">
                            <P text={person.biography ? person.biography : "There is no biography provided."}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="mx-10 mb-10">
                    <Filmography person={person} configuration={configuration} />
                </div>
            </div>
        </>

    );
}