'use client';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/shared/ui/input-group';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar() {
    const [query, setQuery] = useState<string>('');

    return (
        <div>
            <InputGroup className="mb-5 ">
                <InputGroupInput
                    placeholder="Search for a movie, a tv show, an actor, a director..."
                    value={query}
                    onChange={(value) => {
                        setQuery(value.target.value);
                    }}
                />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}
