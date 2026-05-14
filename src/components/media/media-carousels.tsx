import { CarouselList } from '@/components/carousel';
import { Element } from '@/types/global-interfaces';

interface Props {
    castElements?: Element[];
    crewElements?: Element[];
    recommendationElements?: Element[];
    similarElements?: Element[];
    seasonElements?: Element[];
    episodeElements?: Element[];
}

export default function MediaCarousels({
    seasonElements,
    castElements,
    crewElements,
    recommendationElements,
    similarElements,
    episodeElements,
}: Props) {
    return (
        ((castElements && castElements.length > 0) ||
            (crewElements && crewElements.length > 0) ||
            (recommendationElements && recommendationElements.length > 0) ||
            (seasonElements && seasonElements.length > 0) ||
            (episodeElements && episodeElements.length > 0)) && (
            <div className="mt-10 mb-5 z-10 flex flex-col gap-5">
                {seasonElements && seasonElements.length > 0 && (
                    <CarouselList elements={seasonElements} title="Seasons" />
                )}
                {episodeElements && episodeElements.length > 0 && (
                    <CarouselList elements={episodeElements} title="Episodes" />
                )}
                {castElements && castElements.length > 0 && (
                    <CarouselList elements={castElements} title="Cast" />
                )}
                {crewElements && crewElements.length > 0 && (
                    <CarouselList elements={crewElements} title="Crew" />
                )}
                {recommendationElements &&
                    recommendationElements.length > 0 && (
                        <CarouselList
                            elements={recommendationElements}
                            title="Recommendations"
                        />
                    )}
                {similarElements && similarElements.length > 0 && (
                    <CarouselList elements={similarElements} title="Similar" />
                )}
            </div>
        )
    );
}
