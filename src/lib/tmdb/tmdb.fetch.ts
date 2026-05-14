export async function tmdbFetch<T>(
    endpoint: string,
    revalidate: number
): Promise<T> {
    const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        },

        next: {
            revalidate: revalidate,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch TMDB endpoint: ${endpoint}`);
    }

    return response.json();
}
