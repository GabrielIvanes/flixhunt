import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Cast } from '../cast.types';

type Props = {
    : Cast;
    href?: string;
    info?: ReactNode;
    width?: number;
};

export default function PersonCard({ cast, href, info, width = 175 }: Props) {
    const card = (
        <div className="group" style={{ width: width }}>
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-(--radius) bg-muted">
                {cast.profileUrl ? (
                    <Image
                        src={cast.profileUrl}
                        alt={cast.name}
                        fill
                        sizes={`${width}px`}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
                        <ImageOff size={48} />
                        <span className="mt-2 text-sm">{cast.name}</span>
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
