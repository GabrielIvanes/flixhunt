import {Configuration} from "@/types/tmdb-interfaces";

export async function getConfiguration() {
    const url = `${process.env.API_BASE_URL}/tmdb/configuration`
    const response = await fetch(url);
    const json = await response.json();

    if (json.success) {
        const configuration: Configuration = json.data;
        return configuration;
    } else {
        throw new Error(json.error);
    }
}