import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';

type Role = 'cast' | 'crew' | 'director';
type Sort =
    | 'year-descending'
    | 'year-ascending'
    | 'popularity-descending'
    | 'popularity-ascending';

type Props = {
    role: Role;
    setRole: (role: Role) => void;
    sortBy: Sort;
    setSortBy: (sortBy: Sort) => void;
};

export default function PersonFilmographySelects({ role, setRole, sortBy, setSortBy }: Props) {
    return (
        <div className="w-full flex gap-5 mb-5">
            <Select
                value={role}
                onValueChange={(value: Role) => setRole(value)}
            >
                <SelectTrigger className="w-45">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent position={'popper'}>
                    <SelectGroup>
                        <SelectItem value="cast">Cast</SelectItem>
                        <SelectItem value="crew">Crew</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                value={sortBy}
                onValueChange={(value: Sort) => setSortBy(value)}
            >
                <SelectTrigger className="w-55">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent position={'popper'}>
                    <SelectGroup>
                        <SelectItem value="year-descending">
                            Year descending
                        </SelectItem>
                        <SelectItem value="year-ascending">
                            Year ascending
                        </SelectItem>
                        <SelectItem value="popularity-descending">
                            Popularity descending
                        </SelectItem>
                        <SelectItem value="popularity-ascending">
                            Popularity ascending
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
