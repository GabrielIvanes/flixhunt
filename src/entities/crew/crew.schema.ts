import { z } from 'zod';

export const TmdbCrewSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
    department: z.string(),
    job: z.string(),
    credit_id: z.string(),
});

export type TmdbCrewDto = z.infer<typeof TmdbCrewSchema>;
