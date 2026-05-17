import type { PersonBase } from '@/entities/person/person.types';

export type Cast = PersonBase & {
    originalName: string;
    castId: number;
    character: string;
    creditId: string;
    order: number;
};
