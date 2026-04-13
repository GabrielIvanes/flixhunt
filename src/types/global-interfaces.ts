export interface Element {
    id: number;
    image: string;
    width: number;
    height: number;
    tooltip: string;
    name: string;
    type: ElementType;
    isTooltip: boolean;
    isName: boolean;
    isClickable: boolean;
}

type ElementType = '' | 'movie';

export interface Genre {
    id: number;
    name: string;
}