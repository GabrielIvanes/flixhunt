import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
    title: string;
    imageUrl: string | null;
    href?: string;
    info?: ReactNode;
    width?: number;
    scale?: boolean;
    aspectClass?: 'square' | 'poster' | 'rectangle';
};

export default function PosterCard({
    title,
    imageUrl,
    href,
    info,
    width = 175,
    scale = true,
    aspectClass = 'poster',
}: Props) {
    const aspectRatioClasses = {
        poster: 'aspect-2/3',
        square: 'aspect-square',
        rectangle: 'aspect-16/9',
    };

    const card = (
        <div className="group" style={{ width }}>
            <div
                className={cn(
                    'relative w-full overflow-hidden rounded-(--radius) bg-muted',
                    aspectRatioClasses[aspectClass]
                )}
            >
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes={`${width}px`}
                        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${scale ? 'group-hover:scale-100' : ''}`}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
                        <ImageOff size={48} />
                        <span className="mt-2 text-sm">{title}</span>
                    </div>
                )}
            </div>

            {info && (
                <div className="line-clamp-2 text-center text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {info}
                </div>
            )}
        </div>
    );

    if (!href) return card;

    return (
        <Link href={href} className="block">
            {card}
        </Link>
    );
}
