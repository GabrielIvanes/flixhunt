import { buildUrl } from '@/lib/tmdb/tmdb.image';
import { TmdbProviderDto } from '@/entities/provider/provider.schema';
import { Provider } from '@/entities/provider/provider.types';

export async function mapTmdbProvider(dto: TmdbProviderDto): Promise<Provider> {
    return {
        id: dto.provider_id,
        name: dto.provider_name,
        logoUrl: await buildUrl(dto.logo_path, 'w500'),
    };
}
