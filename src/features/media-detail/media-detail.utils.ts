import { WatchProviderOptions } from '@/entities/media/types/media.types';
import { Provider } from '@/entities/provider/provider.types';

export function getProviders(
    watchProviders: Record<string, WatchProviderOptions>,
    countryCode: string
): Provider[] | null {
    return watchProviders[countryCode]?.flatrate;
}
