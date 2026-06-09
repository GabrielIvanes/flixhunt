import { z } from 'zod';
import { TmdbPersonBaseSchema } from '@/entities/person/person.schema';

export const TmdbCastSchema = TmdbPersonBaseSchema.extend({
    original_name: z.string(),
    cast_id: z.number(),
    character: z.string(),
    credit_id: z.string(),
    order: z.number(),
});

export const TmdbGuestStarSchema = TmdbPersonBaseSchema.extend({
    original_name: z.string(),
    character: z.string(),
    credit_id: z.string(),
    order: z.number(),
});

export type TmdbCastDto = z.infer<typeof TmdbCastSchema>;
export type TmdbGuestStarDto = z.infer<typeof TmdbGuestStarSchema>;
