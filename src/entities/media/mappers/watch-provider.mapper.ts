import {
    TmdbProvidersDto,
    TmdbWatchProvidersDto,
} from '@/entities/media/schemas/watch-provider.schema';
import {
    CountryCode,
    Providers,
    WatchProviderOptions,
} from '@/entities/media/types/media.types';
import { mapTmdbProvider } from '@/entities/provider/provider.mapper';
import { buildUrl } from '@/lib/tmdb/tmdb.image';

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

export async function mapTmdbProviders(
    dto: TmdbProvidersDto
): Promise<Providers> {
    return {
        results: await Promise.all(
            dto.results.map(async (provider) => ({
                displayPriorities: provider.display_priorities as Record<
                    CountryCode,
                    number
                >,
                logoUrl: await buildUrl(provider.logo_path, 'w500'),
                providerId: provider.provider_id,
                providerName: provider.provider_name,
                displayPriority: provider.display_priority,
            }))
        ),
    };
}
