'use client';

import {
    Element as ElementInterface,
    Filters,
    Genre,
    Providers,
} from '@/types/global-interfaces';
import Element from '@/components/ui/element';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/pagination';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { H1 } from './ui/typography';
import { useState, useMemo, useEffect } from 'react';
import { useComboboxAnchor } from '@/components/ui/combobox';
import { handleFilterChange } from '@/services/media';
import FiltersGenres from './filters/filters-genres';
import FiltersDate from './filters/filters-date';
import FiltersVote from './filters/filters-vote';
import FiltersProviders from './filters/filters-providers';
import FiltersBadges from './filters/filters-badges';

interface Props {
    mediaElements: ElementInterface[];
    mediaType: 'movie' | 'tv';
    genres: Genre[];
    providers: Providers;
    defaultVoteGte: number;
    totalPages: number;
}

export default function FiltersMedia({
    mediaElements,
    mediaType,
    genres,
    providers,
    defaultVoteGte,
    totalPages,
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const anchor = useComboboxAnchor();

    const providersMap = useMemo(() => {
        return new Map(providers.results.map((p) => [p.provider_id, p]));
    }, [providers.results]);

    const pageParam = Number(searchParams.get('page')) || 1;
    const withGenres = searchParams.get('with_genres') || '';
    const decadeParam = Number(searchParams.get('decade')) || null;
    const yearParam = Number(searchParams.get('year')) || null;
    const rateGte = Number(searchParams.get('rate_gte')) || 1;
    const rateLte = Number(searchParams.get('rate_lte')) || 10;
    const voteGte = searchParams.get('vote_gte')
        ? Number(searchParams.get('vote_gte'))
        : defaultVoteGte;
    const withProviders = searchParams.get('with_providers') ?? '';

    const filtersFromParams = useMemo<Filters>(
        () => ({
            selectedGenres: withGenres
                ? withGenres.split(',').map(Number).filter(Boolean)
                : [],
            selectedDecade: decadeParam,
            selectedYear: yearParam,
            selectedVoteAverage: [rateGte, rateLte],
            selectedVoteCount: [voteGte],
            selectProviders: withProviders
                ? withProviders.split('|').map(Number).filter(Boolean)
                : [],
        }),
        [
            withGenres,
            decadeParam,
            yearParam,
            rateGte,
            rateLte,
            voteGte,
            withProviders,
        ]
    );

    const [filters, setFilters] = useState<Filters>(filtersFromParams);

    useEffect(() => {
        setFilters(filtersFromParams);
    }, [filtersFromParams]);

    console.log(filters);

    function resetFilters() {
        setFilters({
            selectedGenres: [],
            selectedDecade: null,
            selectedYear: null,
            selectedVoteAverage: [1, 10],
            selectedVoteCount: [defaultVoteGte],
            selectProviders: [],
        });

        router.push(`/${mediaType}s`);
    }

    function cancelNewFilters() {
        const prevFilters: Filters = {
            selectedGenres: withGenres
                ? withGenres.split(',').map(Number).filter(Boolean)
                : [],
            selectedDecade: decadeParam,
            selectedYear: yearParam,
            selectedVoteAverage: [rateGte, rateLte],
            selectedVoteCount: [voteGte],
            selectProviders: withProviders
                ? withProviders.split('|').map(Number).filter(Boolean)
                : [],
        };
        setFilters(prevFilters);

        handleFilterChange(
            `${mediaType}s`,
            prevFilters,
            defaultVoteGte,
            searchParams,
            router
        );
    }

    return (
        <>
            <Dialog>
                <DialogTrigger
                    render={<Button variant="outline">Filters</Button>}
                />
                <DialogContent showCloseButton={false} className="max-h-[90vh] max-w-[90vh]! w-140 flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Filters</DialogTitle>
                        <DialogDescription>Change filters</DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto flex-1 pr-5">
                        <FiltersGenres
                            genres={genres}
                            filters={filters}
                            setFilters={setFilters}
                        />

                        <FiltersDate
                            filters={filters}
                            setFilters={setFilters}
                        />

                        <FiltersVote
                            filters={filters}
                            setFilters={setFilters}
                            mediaType={mediaType}
                        />

                        <FiltersProviders
                            providers={providers}
                            providersMap={providersMap}
                            filters={filters}
                            setFilters={setFilters}
                            anchor={anchor}
                        />
                    </div>
                    <DialogFooter className="flex justify-between! items-center">
                        <DialogClose
                            render={
                                <Button
                                    type="reset"
                                    variant="destructive"
                                    onClick={resetFilters}
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
                                                `${mediaType}s`,
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
                                        onClick={cancelNewFilters}
                                    >
                                        Cancel
                                    </Button>
                                }
                            />
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <FiltersBadges
                filters={filters}
                genres={genres}
                providersMap={providersMap}
                defaultVoteGte={defaultVoteGte}
            />
            <div className="flex flex-wrap justify-center gap-10">
                {mediaElements.length > 0 ? (
                    mediaElements.map((media) => (
                        <Element key={media.id} element={media} />
                    ))
                ) : (
                    <H1 text={`No ${mediaType} find with those filters`} />
                )}
            </div>
            {mediaElements.length > 0 && totalPages > 1 && (
                <Pagination
                    page={pageParam}
                    totalPages={totalPages}
                    media={`${mediaType}s`}
                    searchParams={searchParams}
                    router={router}
                />
            )}
        </>
    );
}
