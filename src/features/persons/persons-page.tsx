import { H3, Muted } from '@/shared/ui/typography';
import { getPopularPersons } from './services/get-popular-persons';
import PersonsSection from './sections/persons-section';
import PaginationSection from '../movies/sections/pagination-section';

type Props = {
    page: number;
};

export default async function PersonsPage({ page }: Props) {
    const language = 'en-US';

    const persons = await getPopularPersons(language, page);

    console.log(page);

    console.log(persons);

    return (
        <div>
            {persons.totalResults > 0 ? (
                <PersonsSection persons={persons} />
            ) : (
                <section className="mx-auto flex min-h-80 max-w-xl flex-col items-center justify-center px-4 text-center">
                    <H3>No results found</H3>
                    <Muted className="mt-2">
                        No persons match these filters. Try removing some of
                        them.
                    </Muted>
                </section>
            )}

            {persons.totalResults > 0 && persons.totalPages > 1 && (
                <PaginationSection
                    defaultPage={page}
                    totalPages={persons.totalPages}
                    mediaType="person"
                />
            )}
        </div>
    );
}
