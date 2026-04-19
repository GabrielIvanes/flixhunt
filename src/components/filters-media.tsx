'use client'

import { Element as ElementInterface, Genre } from "@/types/global-interfaces"
import Element from "@/components/ui/element"
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { H1, H3, H4 } from "./ui/typography";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDecades } from "@/lib/utils";

interface Props {
    mediaElements: ElementInterface[];
    genres: Genre[];
    totalPages: number
}

interface Filters {
    selectedGenres: number[];
    selectedDecade: number | null;
    selectedYear: number | null;
}

export default function FiltersMedia({ mediaElements, genres, totalPages }: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const pageParam = Number(searchParams.get("page")) || 1;
    const withGenres: string = searchParams.get("with_genres") || "";
    const decadeParam = searchParams.get("decade");
    const yearParam = searchParams.get("year");

    const currentYear = new Date().getFullYear();
    const startYear = 1895;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => 1895 + i);
    const decades = getDecades(startYear, currentYear);

    const [filters, setFilters] = useState<Filters>({
        selectedGenres: withGenres
            ? withGenres.split(',').map(Number).filter(Boolean)
            : [],
        selectedDecade: decadeParam ? Number(decadeParam) : null,
        selectedYear: yearParam ? Number(yearParam) : null
    })

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page != 1) params.set("page", page.toString());
        else params.delete("page")

        router.push(`/movies${params.toString() ? `?${params.toString()}` : ""}`);
    };

    const handleFilterChange = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (filters.selectedGenres.length > 0) params.set("with_genres", filters.selectedGenres.join(','));
        else params.delete("with_genres")

        if (filters.selectedYear) params.set("year", filters.selectedYear.toString())
        else params.delete("year")

        if (filters.selectedDecade && !filters.selectedYear) params.set("decade", filters.selectedDecade.toString())
        else params.delete("decade")
        
        router.push(`/movies${params.toString() ? `?${params.toString()}` : ""}`);
    }

    const resetFilters = () => {
        setFilters({
            selectedGenres: [],
            selectedDecade: null,
            selectedYear: null
        })

        router.push("/movies")
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Filters</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Filters</DialogTitle>
                        <DialogDescription>
                            Change filters
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div>
                            <H3 text="Genres" />
                            <div className="flex gap-2 flex-wrap">
                                {genres.map((genre) => (
                                    <Button variant={filters.selectedGenres.includes(genre.id) ? 'default' : 'ghost'} key={genre.id} onClick={() => {
                                        setFilters((prev) => ({
                                            ...prev,
                                            selectedGenres: prev.selectedGenres.includes(genre.id) ? prev.selectedGenres.filter((g) => g != genre.id) : [...prev.selectedGenres, genre.id]
                                        }))
                                    }}>{genre.name}</Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <H3 text="Dates" />
                            <div className="flex gap-2">
                                <div className="flex flex-col gap-2">
                                    <H4 text="Decades" />
                                    <Select key={filters.selectedDecade} value={filters.selectedDecade?.toString()} onValueChange={(value) => setFilters((prev) => ({
                                        ...prev,
                                        selectedDecade: value == 'any' ? null : Number(value),
                                        selectedYear: null
                                    }))}>
                                        <SelectTrigger className="w-27.5">
                                            <SelectValue placeholder="Decade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">Any</SelectItem>
                                            {decades.map((decade) => (
                                                <SelectItem key={decade} value={decade.toString()}>
                                                    {decade}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <H4 text="Years" />
                                    <Select key={filters.selectedYear} value={filters.selectedYear?.toString()} onValueChange={(value) => setFilters((prev) => ({
                                        ...prev,
                                        selectedYear: value == 'any' ? null : Number(value)
                                    }))}>
                                        <SelectTrigger className="w-27.5">
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-90 overflow-y-auto">
                                            <SelectItem value="any">Any</SelectItem>
                                            {years.map((year) => (
                                                filters.selectedDecade ?
                                                    (year >= filters.selectedDecade && year < filters.selectedDecade + 10) &&
                                                    <SelectItem key={year} value={year.toString()}>
                                                        {year}
                                                    </SelectItem> : <SelectItem key={year} value={year.toString()}>
                                                        {year}
                                                    </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-between! items-center">
                        <DialogClose asChild>
                            <Button type="reset" variant="destructive" onClick={resetFilters}>Reset</Button>
                        </DialogClose>
                        <div className="flex gap-2">
                            <DialogClose asChild>
                                <Button type="submit" onClick={handleFilterChange}>Apply</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="button">Cancel</Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
            <div className="flex flex-wrap justify-center gap-10">
                {mediaElements.length > 0 ? mediaElements.map((media) => (
                    <Element key={media.id} element={media} />
                )) : <H1 text="No movie find with those filters" />}
            </div>
            {mediaElements.length > 0 && totalPages > 1 && <Pagination page={pageParam} setPage={handlePageChange} totalPages={totalPages} />}
        </>
    )
}
