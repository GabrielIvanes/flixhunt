import { z } from 'zod';
import { TmdbPersonBaseSchema } from '@/entities/person/person.schema';

export const TmdbCrewSchema = TmdbPersonBaseSchema.extend({
    original_name: z.string(),
    department: z.string(),
    job: z.string(),
    credit_id: z.string(),
});

export type TmdbCrewDto = z.infer<typeof TmdbCrewSchema>;
