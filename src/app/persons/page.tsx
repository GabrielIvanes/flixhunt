import { getPopularPersons } from '@/lib/persons';
import { getConfiguration } from '@/lib/tmdb';
import { mediaToElement } from '@/lib/utils';
import { PersonSummary } from '@/types/person-interfaces';
import { TMDBResponse } from '@/types/tmdb-interfaces';
import FiltersMedia from '@/components/filters-media';

export default async function Persons({
    searchParams,
}: {
    searchParams: Promise<{
        page: string;
    }>;
}) {
    const { page } = (await searchParams) || 1;

    console.log('page:', page);

    const persons: TMDBResponse<PersonSummary> = await getPopularPersons(
        '',
        Number(page)
    );
    const configuration = await getConfiguration();
    const personsElements = persons.results.map((person) =>
        mediaToElement(
            person.id,
            person.name,
            person.profile_path
                ? `${configuration.images.secure_base_url}w500${person.profile_path}`
                : '',
            'person',
            250,
            250 * 1.5,
            '',
            person.name,
            true
        )
    );

    return (
        <div className="pb-5 mt-30">
            <FiltersMedia
                mediaElements={personsElements}
                mediaType="person"
                genres={null}
                defaultVoteGte={8000}
                totalPages={persons.total_pages}
                providers={null}
                showFilters={false}
            />
        </div>
    );
}
