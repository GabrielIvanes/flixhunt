import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Element} from "@/types/global-interfaces";
import {Movie, MovieDetail, Provider} from "@/types/movie-interfaces";
import {Configuration} from "@/types/tmdb-interfaces";
import {Crew} from "@/types/person-interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function movieToElement(movie: Movie | MovieDetail, configuration: Configuration, width: number, height: number, isClickable: boolean, isTooltip: boolean, isName: boolean): Element {
    return {
        id: movie.id,
        type: "movie",
        image: movie.poster_path ? `${configuration.images.secure_base_url}w500${movie.poster_path}` : '',
        width: width,
        height: height,
        tooltip: movie.title,
        name: movie.title,
        isClickable: isClickable,
        isTooltip: isTooltip,
        isName: isName
    }
}

export function providerToElement(provider: Provider, configuration: Configuration, width: number, height: number) {
    return {
        id: provider.provider_id,
        type: "",
        image: provider.logo_path ? `${configuration.images.secure_base_url}w500${provider.logo_path}` : '',
        width: width,
        height: height,
        tooltip: provider.provider_name,
        name: provider.provider_name,
        isClickable: false,
        isTooltip: true,
        isName: false
    }
}

export function getDirectors(crew: Crew) {
    return crew.filter(c => c.job === "Director");
}

export function formatTime(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = Math.floor(runtime % 60);

    let duration = '';

    if (hours > 0) duration += `${hours}h`;
    if (minutes > 0) duration += `${minutes}min`;

    return duration;
}