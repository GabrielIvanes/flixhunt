import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';

export default function Search() {
    return (
        <div className="mt-30 px-10">
            <InputGroup>
                <InputGroupInput placeholder="Search for a movie, a tv show, an actor, a director..." />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
