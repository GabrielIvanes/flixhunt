import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Element } from '@/types/global-interfaces';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function mediaToElement(
    id: number,
    name: string,
    image: string,
    mediaType: 'movie' | 'tv' | 'person' | 'provider',
    width: number,
    height: number,
    tooltip: string,
    information: string,
    isClickable: boolean
): Element {
    return {
        id: id,
        name: name,
        image: image,
        type: mediaType,
        width: width,
        height: height,
        tooltip: tooltip,
        information: information,
        isClickable: isClickable,
    };
}

export function formatTime(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = Math.floor(runtime % 60);

    let duration = '';

    if (hours > 0) duration += `${hours}h`;
    if (minutes > 0) duration += `${minutes}min`;

    return duration;
}

export function getDecades(startYear: number, endYear: number) {
    const result: number[] = [];

    const startDecade = Math.floor(startYear / 10) * 10;
    const endDecade = Math.floor(endYear / 10) * 10;

    for (let year = startDecade; year <= endDecade; year += 10) {
        result.push(year);
    }

    return result;
}
