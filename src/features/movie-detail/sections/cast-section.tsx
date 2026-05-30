import { Cast } from '@/entities/cast/cast.types';
import {
    castAggregateCreditToCast,
    mergeCastCharacters,
} from '@/entities/cast/cast.utils';
import { PersonCastAggregateCredit } from '@/entities/person/person.types';
import CastCarousel from '@/features/media/components/carousels/cast-carousel';

type Props = {
    cast?: Cast[];
    aggregateCast?: PersonCastAggregateCredit[];
};

export default function CastSection({ cast, aggregateCast }: Props) {
    const c: Cast[] = cast
        ? mergeCastCharacters(cast)
        : aggregateCast
          ? mergeCastCharacters(aggregateCast.map(castAggregateCreditToCast))
          : [];

    if (c.length === 0) return null;

    return (
        <section className="pb-5">
            <CastCarousel
                title="Cast"
                cast={c}
                getInfo={(cast) => cast.name}
                getTooltip={(cast) => cast.character}
            />
        </section>
    );
}
