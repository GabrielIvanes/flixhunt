import { H3 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/combobox';
import { Filters, Providers } from '@/types/global-interfaces';
import * as React from 'react';

interface Props {
    providers: Providers | null;
    providersMap: Map<number, Providers['results'][number]>;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    anchor: React.RefObject<HTMLDivElement | null>;
}

export default function FiltersProviders({
    providers,
    providersMap,
    filters,
    setFilters,
    anchor,
}: Props) {
    return (
        <div className="max-w-full">
            <H3 text="Providers" />
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
                                                    {provider?.provider_name}
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
    );
}
