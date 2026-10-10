import { z } from 'zod';

export const TmdbGenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const TmdbGenresSchema = z.object({
    genres: z.array(TmdbGenreSchema),
});

export type TmdbGenreDto = z.infer<typeof TmdbGenreSchema>;
export type TmdbGenresDto = z.infer<typeof TmdbGenresSchema>;
