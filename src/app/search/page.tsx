import SearchBar from '@/features/search/components/search-bar';

export default async function Search({
    searchParams,
}: {
    searchParams: Promise<{
        query: string;
    }>;
}) {
    const { query } = await searchParams;

    return (
        <div>
            <div className="px-10 w-full">
                <SearchBar />
            </div>
        </div>
    );
}
