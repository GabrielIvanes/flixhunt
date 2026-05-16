import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import { Provider } from '../provider.types';

type Props = {
    provider: Provider;
};

export default function ProviderCard({ provider }: Props) {
    const width = 45;

    return (
        <div className="group" style={{ width: width }}>
            <div className="relative aspect-square w-full overflow-hidden rounded-(--radius) bg-muted">
                {provider.logoUrl ? (
                    <Image
                        src={provider.logoUrl}
                        alt={provider.name}
                        fill
                        sizes={`${width}px`}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
                        <ImageOff size={48} />
                        <span className="mt-2 text-sm">{provider.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
