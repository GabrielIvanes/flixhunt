import { z } from 'zod';

export const TmdbGenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export type TmdbGenreDto = z.infer<typeof TmdbGenreSchema>;
