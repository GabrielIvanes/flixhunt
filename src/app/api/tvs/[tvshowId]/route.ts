import { type NextRequest, NextResponse } from 'next/server'
import {TvshowDetail} from "@/types/tvshow-interfaces";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ tvshowId: string }> }
) {
    const { tvshowId } = await params
    const { searchParams } = req.nextUrl;
    const language = searchParams.get('language') || 'en-US';

    if (!language) {
        return NextResponse.json({ success: false, data: null, error: "Missing parameter language" }, { status: 400 })
    }

    const url: string = `${process.env.TMDB_BASE_URL}/tv/${tvshowId}?append_to_response=aggregate_credits,watch/providers,recommendations,content_ratings,videos&language=${language}`;
    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        },
        cache: 'force-cache'
    };

    try {
        const data = await fetch(url, options);
        const tvshow: TvshowDetail = await data.json();
        return NextResponse.json({ success: true, data: tvshow, error: null }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ success: false, data: null, error: err }, { status: 500 })
    }
}