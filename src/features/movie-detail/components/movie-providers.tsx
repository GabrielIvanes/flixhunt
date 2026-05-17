import { MovieDetail } from '@/entities/movie/types/movie.types';
import { getProviders } from '../movie-detail.utils';
import { H2 } from '@/shared/ui/typography';
import ProviderCard from '@/entities/provider/components/provider-card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

type Props = {
    movie: MovieDetail;
    countryCode: string;
};

export default function MovieProviders({ movie, countryCode }: Props) {
    const providers = getProviders(movie, countryCode);

    if (!providers || providers.length === 0) return null;
    return (
        <div>
            <H2 className="mb-1">Providers</H2>
            <div className="flex gap-1">
                {providers.map((provider) => (
                    <Tooltip key={provider.id}>
                        <TooltipTrigger>
                            <ProviderCard provider={provider} />
                        </TooltipTrigger>
                        <TooltipContent>{provider.name}</TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}
