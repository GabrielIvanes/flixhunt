import PersonsPage from '@/features/persons/persons-page';

export default async function Persons({
    searchParams,
}: {
    searchParams: Promise<{
        page: string;
    }>;
}) {
    const params = await searchParams;
    const page = params.page ? parseInt(params.page) : 1;

    return (
        <div className="pb-5">
            <PersonsPage page={Number(page)} />
        </div>
    );
}
