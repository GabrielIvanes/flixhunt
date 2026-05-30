import { Crew } from '@/entities/crew/crew.types';
import {
    crewAggregateCreditToCrew,
    mergeCrewJobs,
} from '@/entities/crew/crew.utils';
import { PersonCrewAggregateCredit } from '@/entities/person/person.types';
import CrewCarousel from '@/features/media/components/carousels/crew-carousel';

type Props = {
    crew?: Crew[];
    aggregateCrew?: PersonCrewAggregateCredit[];
};

export default function CrewSection({ crew, aggregateCrew }: Props) {
    const c = crew
        ? mergeCrewJobs(crew)
        : aggregateCrew
          ? mergeCrewJobs(aggregateCrew.map(crewAggregateCreditToCrew))
          : [];

    if (c.length === 0) return null;

    return (
        <section className="pb-5">
            <CrewCarousel
                title="Crew"
                crew={c}
                getInfo={(crew) => crew.name}
                getTooltip={(crew) => crew.job}
            />
        </section>
    );
}
