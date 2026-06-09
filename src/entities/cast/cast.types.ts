import type { PersonBase } from '@/entities/person/person.types';

export type GuestStar = PersonBase & {
    originalName: string;
    character: string;
    creditId: string;
    order: number;
};

export type Cast = GuestStar & {
    castId: number;
};
