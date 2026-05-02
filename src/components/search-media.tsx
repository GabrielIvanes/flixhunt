'use client';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Element as ElementInterface } from '@/types/global-interfaces';
import Element from '@/components/ui/element';

interface Props {
    movieElements: ElementInterface[];
    tvshowElements: ElementInterface[];
    personElements: ElementInterface[];
    mediaElements: ElementInterface[];
}

export default function SearchMedia({
    movieElements,
    tvshowElements,
    personElements,
    mediaElements,
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryParams = searchParams.get('query') || '';
    const hasSearched = !!searchParams.get('query');

    // const [tabValue, setTabValue] = useState<string>(mediaElements[0].type);

    const [query, setQuery] = useState<string>(queryParams);
    const [page, setPage] = useState<number>(1);

    const [tabValue, setTabValue] = useState<string | null>(null);
    const currentTab = tabValue ?? mediaElements?.[0]?.type ?? 'movie';

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query === queryParams) return;

            startTransition(() => {
                const params = new URLSearchParams();

                if (query) {
                    params.set('query', query);
                }

                router.push(
                    `/search${params.toString() ? `?${params.toString()}` : ''}`
                );
            });
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query, queryParams, router]);

    return (
        <div>
            <InputGroup className="mb-5">
                <InputGroupInput
                    placeholder="Search for a movie, a tv show, an actor, a director..."
                    value={query}
                    onChange={(value) => {
                        setQuery(value.target.value);
                        setTabValue(null);
                    }}
                />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
            <Tabs
                value={currentTab}
                onValueChange={(value) => {
                    setTabValue(value);
                    setPage(1);
                }}
            >
                <TabsList className="w-full">
                    <TabsTrigger value="movie">Movies</TabsTrigger>
                    <TabsTrigger value="tv">TV Shows</TabsTrigger>
                    <TabsTrigger value="person">Persons</TabsTrigger>
                </TabsList>
                <TabsContent
                    value="movie"
                    className="flex flex-wrap justify-center gap-5 my-5"
                >
                    {!hasSearched
                        ? 'Write something and search'
                        : isPending
                          ? 'Loading...'
                          : movieElements.length > 0
                            ? movieElements.map((movie) => (
                                  <Element key={movie.id} element={movie} />
                              ))
                            : 'There is no movie found with this query.'}
                </TabsContent>
                <TabsContent
                    value="tv"
                    className="flex flex-wrap justify-center gap-5 my-5"
                >
                    {!hasSearched
                        ? 'Write something and search'
                        : isPending
                          ? 'Loading...'
                          : tvshowElements.length > 0
                            ? tvshowElements.map((tv) => (
                                  <Element key={tv.id} element={tv} />
                              ))
                            : 'There is no tv show found with this query.'}
                </TabsContent>
                <TabsContent
                    value="person"
                    className="flex flex-wrap justify-center gap-5 my-5"
                >
                    {!hasSearched
                        ? 'Write something and search'
                        : isPending
                          ? 'Loading...'
                          : personElements.length > 0
                            ? personElements.map((person) => (
                                  <Element key={person.id} element={person} />
                              ))
                            : 'There is no person found with this query.'}
                </TabsContent>
            </Tabs>
        </div>
    );
}
