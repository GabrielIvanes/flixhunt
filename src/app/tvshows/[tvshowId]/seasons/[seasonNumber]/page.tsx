import SeasonDetailPage from '@/features/season-detail/season-detail-page';

export default async function Season({
    params,
}: {
    params: Promise<{ tvshowId: string; seasonNumber: string }>;
}) {
    const { tvshowId, seasonNumber } = await params;

    return SeasonDetailPage({
        tvshowId: parseInt(tvshowId),
        seasonNumber: parseInt(seasonNumber),
    });
}
