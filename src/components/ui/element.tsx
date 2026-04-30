'use client';

import Image from 'next/image';
import { Element as ElementInterface } from '@/types/global-interfaces';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
    element: ElementInterface;
}

export default function Element({ element }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(!!element.image);
    if (!element.name) console.log(element)

    const div = (
        <div className="flex flex-col items-center gap-1 group">
            <div
                className="relative"
                style={{ width: element.width, height: element.height }}
            >
                {isLoading && (
                    <Skeleton
                        className="rounded-(--radius)"
                        style={{ width: element.width, height: element.height }}
                    />
                )}
                {element.image ? (
                    <Image
                        src={element.image}
                        alt={element.name}
                        fill={true}
                        sizes={`${element.width}px`}
                        className={`rounded-(--radius) ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                    />
                ) : (
                    <div
                        className={`flex flex-col justify-center items-center bg-muted rounded-(--radius) px-4`}
                        style={{ width: element.width, height: element.height }}
                    >
                        <ImageOff size={64} className="flex-7/12" />
                        <div className="text-center flex-5/12">
                            {element.name}
                        </div>
                    </div>
                )}
            </div>
            {element.information && (
                <div
                    className="text-center relative text-muted-foreground group-hover:text-foreground"
                    style={{ width: element.width }}
                >
                    {element.information}
                </div>
            )}
        </div>
    );

    return element.tooltip ? (
        <Tooltip>
            <TooltipTrigger>
                {element.isClickable ? (
                    <Link href={`/${element.type}s/${element.id}`}>{div}</Link>
                ) : (
                    div
                )}
            </TooltipTrigger>
            <TooltipContent>
                <div className="text-center">{element.tooltip}</div>
            </TooltipContent>
        </Tooltip>
    ) : element.isClickable ? (
        <Link href={`/${element.type}s/${element.id}`}>{div}</Link>
    ) : (
        div
    );
}
