import MovieDetailPage from '@/features/movie-detail/movie-detail-page';

export default async function Movie({
    params,
}: {
    params: Promise<{ movieId: string }>;
}) {
    const { movieId } = await params;

    return <MovieDetailPage movieId={Number(movieId)} />;
}
