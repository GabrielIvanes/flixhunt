'use client';

import { Providers } from '@/entities/media/types/media.types';
import { Filters } from '@/shared/types/filters.types';
import { Button } from '@/shared/ui/button';
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
} from '@/shared/ui/combobox';
import { H2 } from '@/shared/ui/typography';
import React from 'react';
import { useMemo } from 'react';

type Props = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    anchor: React.RefObject<HTMLDivElement | null>;
    providers: Providers;
};

export default function FilterProviders({
    filters,
    setFilters,
    anchor,
    providers,
}: Props) {
    const providersMap = useMemo(() => {
        return new Map(providers?.results.map((p) => [p.providerId, p]) || []);
    }, [providers?.results]);

    return (
        <div className="max-w-full">
            <H2>Providers</H2>
            <div className="mt-2 max-w-full flex justify-between items-stretch gap-2">
                <Combobox
                    multiple
                    autoHighlight
                    items={providers?.results}
                    value={filters.selectProviders}
                    onValueChange={(values: number[]) =>
                        setFilters((prev) => ({
                            ...prev,
                            selectProviders: values,
                        }))
                    }
                >
                    <ComboboxChips ref={anchor} className="flex-1">
                        <ComboboxValue>
                            {(values) => (
                                <React.Fragment>
                                    {values.length === 0 ? (
                                        <span className="text-muted-foreground">
                                            Select a provider
                                        </span>
                                    ) : (
                                        values.map((value: number) => {
                                            const provider =
                                                providersMap.get(value);

                                            return (
                                                <ComboboxChip
                                                    className="gap-2"
                                                    key={value}
                                                >
                                                    {provider?.providerName}
                                                </ComboboxChip>
                                            );
                                        })
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
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                            {(provider) => (
                                <ComboboxItem
                                    key={provider.providerId}
                                    value={provider.providerId}
                                >
                                    {provider.providerName}
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
    );
}
