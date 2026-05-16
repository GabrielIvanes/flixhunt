import { TmdbVideoDto } from './video.schema';
import { Video } from './video.types';

export function mapTmdbVideo(dto: TmdbVideoDto): Video {
    return {
        id: dto.id,
        key: dto.key,
        name: dto.name,
        site: dto.site,
        type: dto.type,
        official: dto.official,
        publishedAt: dto.published_at,
    };
}
