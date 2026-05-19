import MediaBackdrop from '@/entities/media/components/media-backdrop';
import { getTvshowDetail } from './services/get-tvshow-detail';
import TvshowDetailClient from './tvshow-detail-client';
import CastSection from '../movie-detail/sections/cast-section';
import CrewSection from '../movie-detail/sections/crew-section';
import RecommendationSection from './sections/recommendation-section';
import SimilarSection from './sections/similar-section';

type Props = {
    tvshowId: number;
};

export default async function TvshowDetailPage({ tvshowId }: Props) {
    const tvshow = await getTvshowDetail(tvshowId);

    console.log(tvshow.aggregateCredits.cast);
    const width: number = 370;
    const countryCode = 'FR';

    console.log(tvshow);

    return (
        <div>
            <MediaBackdrop src={tvshow.posterUrl} alt={tvshow.name} />
            <TvshowDetailClient
                tvshow={tvshow}
                width={width}
                countryCode={countryCode}
            />
            <CastSection aggregateCast={tvshow.aggregateCredits.cast} />
            <CrewSection aggregateCrew={tvshow.aggregateCredits.crew} />
            <RecommendationSection tvshow={tvshow} />
            <SimilarSection tvshow={tvshow} />
        </div>
    );
}
