import { H2, P } from '@/shared/ui/typography';
import { PersonDetail } from '../../../entities/person/person.types';

type Props = {
    person: PersonDetail;
};

export default function PersonBiography({ person }: Props) {
    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <H2 className="mb-2">Biography</H2>
            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                <P>
                    {person.biography
                        ? person.biography
                        : 'There is no biography provided.'}
                </P>
            </div>
        </div>
    );
}
