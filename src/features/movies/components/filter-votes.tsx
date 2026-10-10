import { Filters } from '@/shared/types/filters.types';
import { Slider } from '@/shared/ui/slider';
import { H2 } from '@/shared/ui/typography';

type Props = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    maxVoteCount: number;
    stepVoteCount: number;
};

export default function FilterVotes({
    filters,
    setFilters,
    maxVoteCount,
    stepVoteCount,
}: Props) {
    return (
        <div className="flex justify-between gap-6">
            <div className="flex flex-1 flex-col gap-2">
                <H2>Vote average</H2>
                <div className="mx-auto grid w-full max-w-xs gap-3">
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-sm text-muted-foreground">
                            {filters.selectedVoteAverage.join(', ')}
                        </span>
                    </div>
                    <Slider
                        id="slider-vote-average"
                        value={filters.selectedVoteAverage}
                        onValueChange={(value) =>
                            setFilters((prev) => ({
                                ...prev,
                                selectedVoteAverage: value,
                            }))
                        }
                        min={1}
                        max={10}
                        step={1}
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <H2>Vote count</H2>
                <div className="mx-auto grid w-full max-w-xs gap-3">
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-sm text-muted-foreground">
                            {filters.selectedVoteCount}
                        </span>
                    </div>
                    <Slider
                        value={filters.selectedVoteCount}
                        onValueChange={(value) =>
                            setFilters((prev) => ({
                                ...prev,
                                selectedVoteCount: value,
                            }))
                        }
                        min={0}
                        max={maxVoteCount}
                        step={stepVoteCount}
                    />
                </div>
            </div>
        </div>
    );
}
