import {TvshowDetail} from "@/types/tvshow-interfaces";

export async function getTvshowDetail(tvshowId: string, language?: string) {
    let url = `${process.env.API_BASE_URL}/tv-shows/${tvshowId}`;
    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const tvshow: TvshowDetail = json.data;
        return tvshow;
    } else {
        throw new Error(json.error);
    }
}

