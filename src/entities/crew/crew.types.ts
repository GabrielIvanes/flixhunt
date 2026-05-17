import type { PersonBase } from '@/entities/person/person.types';

export type Crew = PersonBase & {
    originalName: string;
    department: string;
    job: string;
    creditId: string;
};
