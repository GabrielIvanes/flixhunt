import { H3, H4 } from '../ui/typography';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getDecades } from '@/lib/utils';
import { Filters } from '@/types/global-interfaces';

interface Props {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function FiltersDate({ filters, setFilters }: Props) {
    const currentYear = new Date().getFullYear();
    const startYear = 1895;
    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => 1895 + i
    );
    const decades = getDecades(startYear, currentYear);

    return (
        <div>
            <H3 text="Dates" />
            <div className="flex gap-2 mt-2">
                <div className="flex flex-col gap-2">
                    <H4 text="Decades" />
                    <Select
                        key={filters.selectedDecade}
                        value={filters.selectedDecade?.toString()}
                        onValueChange={(value: string) =>
                            setFilters((prev) => ({
                                ...prev,
                                selectedDecade:
                                    value == 'any' ? null : Number(value),
                                selectedYear: null,
                            }))
                        }
                    >
                        <SelectTrigger className="w-27.5">
                            <SelectValue placeholder="Decade" />
                        </SelectTrigger>
                        <SelectContent className="max-h-90 overflow-y-auto">
                            <SelectItem value="any">Any</SelectItem>
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
                        onValueChange={(value: string) =>
                            setFilters((prev) => ({
                                ...prev,
                                selectedYear:
                                    value == 'any' ? null : Number(value),
                            }))
                        }
                    >
                        <SelectTrigger className="w-27.5">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-90 overflow-y-auto">
                            <SelectItem value="any">Any</SelectItem>
                            {years.map((year) =>
                                filters.selectedDecade ? (
                                    year >= filters.selectedDecade &&
                                    year < filters.selectedDecade + 10 && (
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
    );
}
