import { z } from 'zod';

type TmdbImages = {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
};

export type TmdbConfigurationDTO = {
    images: TmdbImages;
    change_keys: string[];
};

export const TmdbConfigurationSchema = z.object({
    images: z.object({
        base_url: z.string(),
        secure_base_url: z.string(),
        backdrop_sizes: z.array(z.string()),
        logo_sizes: z.array(z.string()),
        poster_sizes: z.array(z.string()),
        profile_sizes: z.array(z.string()),
        still_sizes: z.array(z.string()),
    }),
    change_keys: z.array(z.string()),
});
