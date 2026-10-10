import PersonCard from '@/entities/person/components/person-card';
import { Person } from '@/entities/person/person.types';
import { PaginatedResponse } from '@/shared/types/paginated-response.types';

type Props = {
    persons: PaginatedResponse<Person>;
};

export default function PersonsSection({ persons }: Props) {
    return (
        <section className="flex flex-wrap gap-4 justify-center">
            {persons.results.map((person) => (
                <div key={person.id}>
                    <PersonCard
                        person={person}
                        href={`/persons/${person.id}`}
                        info={`${person.name}`}
                        width={250}
                    />
                </div>
            ))}
        </section>
    );
}
