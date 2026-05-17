import { PersonDetail } from '@/entities/person/person.types';
import { getPersonDetail } from './services/get-person-detail';
import HeroSection from './sections/hero-section';

type Props = {
    personId: number;
};

export default async function PersonDetailPage({ personId }: Props) {
    const person: PersonDetail = await getPersonDetail(personId);
    const width: number = 370;
    console.log(person);

    return (
        <div>
            <HeroSection person={person} width={width} />
        </div>
    );
}
