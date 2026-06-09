import EpisodeDetailPage from "@/features/episode-detail/episode-detail-page";

export default async function Episode({
    params,
}: {
    params: Promise<{
        tvshowId: string;
        seasonNumber: string;
        episodeNumber: string;
    }>;
}) {
    const { tvshowId, seasonNumber, episodeNumber } = await params;

    return EpisodeDetailPage({
        tvshowId: parseInt(tvshowId),
        seasonNumber: parseInt(seasonNumber),
        episodeNumber: parseInt(episodeNumber),
    });
}
