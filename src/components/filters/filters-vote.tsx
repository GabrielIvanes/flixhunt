import { H3 } from '@/components/ui/typography';
import { Filters } from '@/types/global-interfaces';
import { Slider } from '../ui/slider';

interface Props {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    mediaType: 'movie' | 'tv' | 'person';
}

export default function FiltersVote({ filters, setFilters, mediaType }: Props) {
    return (
        <div className="flex justify-between gap-6">
            <div className="flex flex-1 flex-col gap-2">
                <H3 text="Vote average" />
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
                <H3 text="Vote count" />
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
                        max={
                            mediaType === 'movie'
                                ? 40000
                                : mediaType === 'tv'
                                  ? 27000
                                  : 0
                        }
                        step={
                            mediaType === 'movie'
                                ? 500
                                : mediaType === 'tv'
                                  ? 200
                                  : 0
                        }
                    />
                </div>
            </div>
        </div>
    );
}
