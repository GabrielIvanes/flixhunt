import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Element, ElementType, Media} from "@/types/global-interfaces";
import {MovieSummary, MovieDetail, Provider, Movie} from "@/types/movie-interfaces";
import {Configuration} from "@/types/tmdb-interfaces";
import {Cast, MediaCastCredit, Crew, MediaCrewCredit, PersonDetail} from "@/types/person-interfaces";
import {Tvshow} from "@/types/tvshow-interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mediaToElement(media: Media, mediaType: ElementType, configuration: Configuration, width: number, height: number, isClickable: boolean, isTooltip: boolean, isName: boolean): Element {
    return {
        id: media.id,
        type: mediaType,
        image: media.poster_path ? `${configuration.images.secure_base_url}w500${media.poster_path}` : '',
        width: width,
        height: height,
        tooltip: "name" in media ? (media as Tvshow).name : (media as Movie).title,
        name: "name" in media ? (media as Tvshow).name : (media as Movie).title,
        isClickable: isClickable,
        isTooltip: isTooltip,
        isName: isName
    }
}

export function providerToElement(provider: Provider, configuration: Configuration, width: number, height: number): Element {
    return {
        id: provider.provider_id,
        type: "provider",
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

export function personToElement(person: Cast | Crew | PersonDetail, configuration: Configuration, width: number, height: number, isClickable: boolean, isTooltip: boolean, isName: boolean): Element {
    return {
        id: person.id,
        type: "person",
        image: person.profile_path ? `${configuration.images.secure_base_url}w500${person.profile_path}` : '',
        width: width,
        height: height,
        tooltip: (person as Crew).job ? (person as Crew).job : (person as Cast).character,
        name: person.name,
        isClickable: isClickable,
        isTooltip: isTooltip,
        isName: isName
    }
}

export function formatTime(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = Math.floor(runtime % 60);

    let duration = '';

    if (hours > 0) duration += `${hours}h`;
    if (minutes > 0) duration += `${minutes}min`;

    return duration;
}