'use client';

import {
    Element as ElementInterface,
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
import { H1, H3, H4 } from './ui/typography';
import { useState, useMemo } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getDecades } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from '@/components/ui/combobox';
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';

interface Props {
    mediaElements: ElementInterface[];
    genres: Genre[];
    providers: Providers;
    totalPages: number;
}

interface Filters {
    selectedGenres: number[];
    selectedDecade: number | null;
    selectedYear: number | null;
    selectedVoteAverage: number[];
    selectedVoteCount: number[];
    selectProviders: number[];
}

export default function FiltersMedia({
    mediaElements,
    genres,
    providers,
    totalPages,
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const anchor = useComboboxAnchor();

    const providersMap = useMemo(() => {
        return new Map(providers.results.map((p) => [p.provider_id, p]));
    }, [providers.results]);

    const pageParam = Number(searchParams.get('page')) || 1;
    const withGenres: string = searchParams.get('with_genres') || '';
    const decadeParam = Number(searchParams.get('decade')) || null;
    const yearParam = Number(searchParams.get('year')) || null;
    const rateGte = Number(searchParams.get('rate_gte')) || 1;
    const rateLte = Number(searchParams.get('rate_lte')) || 10;
    const voteGte = Number(searchParams.get('vote_gte')) || 8000;
    const withProviders: string = searchParams.get('with_providers') || '';

    const currentYear = new Date().getFullYear();
    const startYear = 1895;
    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => 1895 + i
    );
    const decades = getDecades(startYear, currentYear);

    const [filters, setFilters] = useState<Filters>({
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
    });

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page != 1) params.set('page', page.toString());
        else params.delete('page');

        router.push(
            `/movies${params.toString() ? `?${params.toString()}` : ''}`
        );
    };

    const handleFilterChange = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        if (filters.selectedGenres.length > 0)
            params.set('with_genres', filters.selectedGenres.join(','));
        else params.delete('with_genres');

        if (filters.selectedYear)
            params.set('year', filters.selectedYear.toString());
        else params.delete('year');

        if (filters.selectedDecade && !filters.selectedYear)
            params.set('decade', filters.selectedDecade.toString());
        else params.delete('decade');

        if (filters.selectedVoteAverage[0] === 1) params.delete('rate_gte');
        else params.set('rate_gte', filters.selectedVoteAverage[0].toString());
        if (filters.selectedVoteAverage[1] === 10) params.delete('rate_lte');
        else params.set('rate_lte', filters.selectedVoteAverage[1].toString());
        if (filters.selectedVoteCount[0] === 8000) params.delete('vote_gte');
        else params.set('vote_gte', filters.selectedVoteCount[0].toString());

        if (filters.selectProviders.length > 0)
            params.set('with_providers', filters.selectProviders.join('|'));
        else params.delete('with_providers');

        router.push(
            `/movies${params.toString() ? `?${params.toString()}` : ''}`
        );
    };

    const resetFilters = () => {
        setFilters({
            selectedGenres: [],
            selectedDecade: null,
            selectedYear: null,
            selectedVoteAverage: [1, 10],
            selectedVoteCount: [8000],
            selectProviders: [],
        });

        router.push('/movies');
    };

    return (
        <>
            <Dialog>
                <DialogTrigger
                    render={<Button variant="outline">Filters</Button>}
                />
                <DialogContent className="max-h-[90vh] max-w-[90vh]! w-140 flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Filters</DialogTitle>
                        <DialogDescription>Change filters</DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto flex-1 pr-5">
                        <div className="mb-5">
                            <H3 text="Genres" />
                            <div className="flex gap-2 flex-wrap">
                                {genres.map((genre) => (
                                    <Button
                                        variant={
                                            filters.selectedGenres.includes(
                                                genre.id
                                            )
                                                ? 'default'
                                                : 'ghost'
                                        }
                                        key={genre.id}
                                        onClick={() => {
                                            setFilters((prev) => ({
                                                ...prev,
                                                selectedGenres:
                                                    prev.selectedGenres.includes(
                                                        genre.id
                                                    )
                                                        ? prev.selectedGenres.filter(
                                                              (g) =>
                                                                  g != genre.id
                                                          )
                                                        : [
                                                              ...prev.selectedGenres,
                                                              genre.id,
                                                          ],
                                            }));
                                        }}
                                    >
                                        {genre.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-5">
                            <H3 text="Dates" />
                            <div className="flex gap-2 mt-2">
                                <div className="flex flex-col gap-2">
                                    <H4 text="Decades" />
                                    <Select
                                        key={filters.selectedDecade}
                                        value={filters.selectedDecade?.toString()}
                                        onValueChange={(value) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                selectedDecade:
                                                    value == 'any'
                                                        ? null
                                                        : Number(value),
                                                selectedYear: null,
                                            }))
                                        }
                                    >
                                        <SelectTrigger className="w-27.5">
                                            <SelectValue placeholder="Decade" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-90 overflow-y-auto">
                                            <SelectItem value="any">
                                                Any
                                            </SelectItem>
                                            {decades.map((decade) => (
                                                <SelectItem
                                                    key={decade}
                                                    value={decade.toString()}
                                                >
                                                    {decade}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <H4 text="Years" />
                                    <Select
                                        key={filters.selectedYear}
                                        value={filters.selectedYear?.toString()}
                                        onValueChange={(value) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                selectedYear:
                                                    value == 'any'
                                                        ? null
                                                        : Number(value),
                                            }))
                                        }
                                    >
                                        <SelectTrigger className="w-27.5">
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-90 overflow-y-auto">
                                            <SelectItem value="any">
                                                Any
                                            </SelectItem>
                                            {years.map((year) =>
                                                filters.selectedDecade ? (
                                                    year >=
                                                        filters.selectedDecade &&
                                                    year <
                                                        filters.selectedDecade +
                                                            10 && (
                                                        <SelectItem
                                                            key={year}
                                                            value={year.toString()}
                                                        >
                                                            {year}
                                                        </SelectItem>
                                                    )
                                                ) : (
                                                    <SelectItem
                                                        key={year}
                                                        value={year.toString()}
                                                    >
                                                        {year}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5 flex justify-between gap-6">
                            <div className="flex flex-1 flex-col gap-2">
                                <H3 text="Vote average" />
                                <div className="mx-auto grid w-full max-w-xs gap-3">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-sm text-muted-foreground">
                                            {filters.selectedVoteAverage.join(
                                                ', '
                                            )}
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
                                        max={40000}
                                        step={500}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5 max-w-full">
                            <H3 text="Providers" />
                            <div className="mt-2 max-w-full flex justify-between items-stretch gap-2">
                                <Combobox
                                    multiple
                                    autoHighlight
                                    items={providers.results}
                                    value={filters.selectProviders}
                                    onValueChange={(values: number[]) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectProviders: values,
                                        }))
                                    }
                                >
                                    <ComboboxChips
                                        ref={anchor}
                                        className="flex-1"
                                    >
                                        <ComboboxValue>
                                            {(values) => (
                                                <React.Fragment>
                                                    {values.length === 0 ? (
                                                        <span className="text-muted-foreground">
                                                            Select a provider
                                                        </span>
                                                    ) : (
                                                        values.map(
                                                            (value: number) => {
                                                                const provider =
                                                                    providersMap.get(
                                                                        value
                                                                    );

                                                                return (
                                                                    <ComboboxChip
                                                                        className="gap-2"
                                                                        key={
                                                                            value
                                                                        }
                                                                    >
                                                                        {
                                                                            provider?.provider_name
                                                                        }
                                                                    </ComboboxChip>
                                                                );
                                                            }
                                                        )
                                                    )}
                                                </React.Fragment>
                                            )}
                                        </ComboboxValue>
                                    </ComboboxChips>
                                    <ComboboxContent anchor={anchor}>
                                        <ComboboxInput
                                            showTrigger={false}
                                            placeholder="Search"
                                        />
                                        <ComboboxEmpty>
                                            No items found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(provider) => (
                                                <ComboboxItem
                                                    key={provider.provider_id}
                                                    value={provider.provider_id}
                                                >
                                                    {provider.provider_name}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                                <Button
                                    variant="destructive"
                                    className="h-auto"
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectProviders: [],
                                        }))
                                    }
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
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
                                        onClick={handleFilterChange}
                                    >
                                        Apply
                                    </Button>
                                }
                            />

                            <DialogClose
                                render={<Button type="button">Cancel</Button>}
                            />
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex gap-2 flew-wrap">
                {filters.selectProviders.length > 0 && (
                    <Badge>
                        {'Providers: '}
                        {filters.selectProviders
                            .map((providerId) => {
                                const provider = providersMap.get(providerId);
                                return provider?.provider_name;
                            })
                            .join(', ')}
                    </Badge>
                )}
                {filters.selectedDecade && (
                    <Badge>{filters.selectedDecade}s</Badge>
                )}
                {filters.selectedYear && <Badge>{filters.selectedYear}</Badge>}
                {filters.selectedGenres.length > 0 && (
                    <Badge>
                        {'Genres: '}
                        {filters.selectedGenres
                            .map((genreId) => {
                                const genre = genres.find(
                                    (g) => g.id === genreId
                                );
                                return genre?.name;
                            })
                            .join(', ')}
                    </Badge>
                )}
                {(filters.selectedVoteAverage[0] > 1 ||
                    filters.selectedVoteAverage[1] < 10) && (
                    <Badge>
                        {filters.selectedVoteAverage[0] > 1 &&
                        filters.selectedVoteAverage[1] < 10
                            ? filters.selectedVoteAverage.join('-') + ' rating'
                            : filters.selectedVoteAverage[0] > 1
                              ? filters.selectedVoteAverage[0] + '+ rating'
                              : filters.selectedVoteAverage[1] + '- rating'}
                    </Badge>
                )}
                {filters.selectedVoteCount[0] != 8000 && (
                    <Badge>{filters.selectedVoteCount[0]}+ votes</Badge>
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-10">
                {mediaElements.length > 0 ? (
                    mediaElements.map((media) => (
                        <Element key={media.id} element={media} />
                    ))
                ) : (
                    <H1 text="No movie find with those filters" />
                )}
            </div>
            {mediaElements.length > 0 && totalPages > 1 && (
                <Pagination
                    page={pageParam}
                    setPage={handlePageChange}
                    totalPages={totalPages}
                />
            )}
        </>
    );
}
