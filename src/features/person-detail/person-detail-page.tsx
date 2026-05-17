import { PersonDetail } from '@/entities/person/person.types';
import { getPersonDetail } from './services/get-person-detail';
import HeroSection from './sections/hero-section';
import PersonFilmography from './sections/person-filmography';

type Props = {
    personId: number;
};

export default async function PersonDetailPage({ personId }: Props) {
    const person: PersonDetail = await getPersonDetail(personId);
    const width: number = 370;
    console.log(person);

    return (
        <div className="px-10">
            <HeroSection person={person} width={width} />
            <PersonFilmography person={person} />
        </div>
    );
}
