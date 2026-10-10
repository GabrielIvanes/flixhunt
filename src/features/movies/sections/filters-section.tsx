'use client';

import { Filters } from '@/shared/types/filters.types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { SlidersHorizontal } from 'lucide-react';
import { MoviesPageParams } from '../types/params.types';
import FilterGenres from '../components/filter-genres';
import FilterDates from '../components/filter-dates';
import FilterVotes from '../components/filter-votes';
import FilterProviders from '../components/filter-providers';
import { useComboboxAnchor } from '@/shared/ui/combobox';
import {
    cancelNewFilters,
    handleFilterChange,
    resetFilters,
} from '@/features/medias/medias.utils';
import { Genre } from '@/entities/genre/genre.types';
import { Providers } from '@/entities/media/types/media.types';
import FilterBadges from '../components/filter-badges';

type Props = {
    defaultVoteGte: number;
    maxVoteCount: number;
    stepVoteCount: number;
    mediaType: 'movie' | 'tvshow';
    moviesPageParams: MoviesPageParams;
    genres: Genre[];
    providers: Providers;
};

export default function FiltersSection({
    moviesPageParams,
    defaultVoteGte,
    mediaType,
    maxVoteCount,
    stepVoteCount,
    genres,
    providers,
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const anchor = useComboboxAnchor();

    const filtersFromParams = useMemo<Filters>(
        () => ({
            selectedGenres: moviesPageParams.withGenres,
            selectedDecade: moviesPageParams.decade,
            selectedYear: moviesPageParams.year,
            selectedVoteAverage: [
                moviesPageParams.rateGte,
                moviesPageParams.rateLte,
            ],
            selectedVoteCount: [moviesPageParams.voteGte],
            selectProviders: moviesPageParams.withProviders,
        }),
        [moviesPageParams]
    );

    const [filters, setFilters] = useState<Filters>(filtersFromParams);

    useEffect(() => {
        setFilters(filtersFromParams);
    }, [filtersFromParams]);

    console.log(filters);

    return (
        <section>
            <Dialog>
                <div className="w-30 ml-10 mb-5">
                    <DialogTrigger
                        className="w-full mx-auto"
                        render={
                            <Button
                                variant="outline"
                                className="flex justify-center items-center gap-2 w-20 cursor-pointer"
                            >
                                <SlidersHorizontal />
                                Filters
                            </Button>
                        }
                    />
                </div>
                <DialogContent
                    showCloseButton={false}
                    className="max-h-[90vh] max-w-[90vh]! w-140 flex flex-col"
                >
                    <div className="overflow-y-auto flex-1 pr-5">
                        <FilterGenres
                            filters={filters}
                            setFilters={setFilters}
                            genres={genres}
                        />
                        <Separator className="mb-5 mt-5" />

                        <FilterDates
                            filters={filters}
                            setFilters={setFilters}
                        />
                        <Separator className="mb-5 mt-5" />

                        <FilterVotes
                            filters={filters}
                            setFilters={setFilters}
                            maxVoteCount={maxVoteCount}
                            stepVoteCount={stepVoteCount}
                        />
                        <Separator className="mb-5 mt-5" />

                        <FilterProviders
                            filters={filters}
                            setFilters={setFilters}
                            anchor={anchor}
                            providers={providers}
                        />
                    </div>
                    <DialogFooter className="flex justify-between! items-center">
                        <DialogClose
                            render={
                                <Button
                                    type="reset"
                                    variant="destructive"
                                    onClick={() =>
                                        resetFilters(
                                            setFilters,
                                            router,
                                            mediaType,
                                            defaultVoteGte
                                        )
                                    }
                                >
                                    Reset
                                </Button>
                            }
                        ></DialogClose>
                        <div className="flex gap-2">
                            <DialogClose
                                render={
                                    <Button
                                        type="submit"
                                        onClick={() =>
                                            handleFilterChange(
                                                `${mediaType}`,
                                                filters,
                                                defaultVoteGte,
                                                searchParams,
                                                router
                                            )
                                        }
                                    >
                                        Apply
                                    </Button>
                                }
                            />

                            <DialogClose
                                render={
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            cancelNewFilters(
                                                setFilters,
                                                filters
                                            )
                                        }
                                    >
                                        Cancel
                                    </Button>
                                }
                            />
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="ml-10 mb-5">
                <FilterBadges
                    filters={filtersFromParams}
                    genres={genres}
                    providers={providers}
                    defaultVoteGte={defaultVoteGte}
                />
            </div>
        </section>
    );
}
