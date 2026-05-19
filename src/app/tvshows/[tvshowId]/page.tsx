import TvshowDetailPage from '@/features/tvshow-detail/tvshow-detail-page';

export default async function Tvshow({
    params,
}: {
    params: Promise<{ tvshowId: string }>;
}) {
    const { tvshowId } = await params;

    return <TvshowDetailPage tvshowId={Number(tvshowId)} />;
}
