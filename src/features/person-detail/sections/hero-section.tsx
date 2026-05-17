import PersonCard from '@/entities/person/components/person-card';
import type { PersonDetail } from '@/entities/person/person.types';
import { H1 } from '@/shared/ui/typography';
import PersonMetadata from '../components/person-metadata';
import { getPersonDate } from '../person-detail.utils';
import PersonBiography from '../components/person-biography';

type Props = {
    person: PersonDetail;
    width: number;
};
export default function HeroSection({ person, width }: Props) {
    return (
        <section className="h-[calc(100vh-7.5rem)] w-full flex gap-10">
            <div className="flex items-center">
                <PersonCard person={person} width={width} />
            </div>
            <div className="flex-1 flex min-h-0 justify-center items-center">
                <div
                    style={{ height: `${width * 1.5}px` }}
                    className="w-full flex min-h-0 flex-col justify-between overflow-hidden"
                >
                    <div className="flex min-h-0 flex-1 flex-col gap-2">
                        <H1>{person.name}</H1>
                        <PersonMetadata
                            date={getPersonDate(
                                person.birthday,
                                person.deathday
                            )}
                            PlaceOfBirth={person.placeOfBirth}
                            knownForDepartment={person.knownForDepartment}
                        />
                        <PersonBiography person={person} />
                    </div>
                </div>
            </div>
        </section>
    );
}
