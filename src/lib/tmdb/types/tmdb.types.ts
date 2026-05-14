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

export type TmdbResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};
