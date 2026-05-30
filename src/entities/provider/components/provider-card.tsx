import { Provider } from '../provider.types';
import PosterCard from '@/shared/components/poster-card';

type Props = {
    provider: Provider;
};

export default function ProviderCard({ provider }: Props) {
    return (
        <PosterCard
            title={provider.name}
            imageUrl={provider.logoUrl}
            width={45}
            aspectClass="square"
        />
    );
}
