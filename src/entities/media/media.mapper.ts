import { mapTmdbProvider } from '../provider/provider.mapper';
import { WatchProviderOptions } from './media.types';
import { TmdbWatchProvidersDto } from './watch-provider.schema';

export async function mapWatchProviders(
    providers: TmdbWatchProvidersDto
): Promise<Record<string, WatchProviderOptions>> {
    const entries = await Promise.all(
        Object.entries(providers.results).map(
            async ([countryCode, options]) => {
                return [
                    countryCode,
                    {
                        link: options.link,
                        flatrate: await Promise.all(
                            (options.flatrate ?? []).map(mapTmdbProvider)
                        ),
                        rent: await Promise.all(
                            (options.rent ?? []).map(mapTmdbProvider)
                        ),
                        buy: await Promise.all(
                            (options.buy ?? []).map(mapTmdbProvider)
                        ),
                        ads: await Promise.all(
                            (options.ads ?? []).map(mapTmdbProvider)
                        ),
                        free: await Promise.all(
                            (options.free ?? []).map(mapTmdbProvider)
                        ),
                    },
                ] as const;
            }
        )
    );

    return Object.fromEntries(entries);
}
