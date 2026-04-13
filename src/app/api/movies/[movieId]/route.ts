import { type NextRequest, NextResponse } from 'next/server'
import {MovieDetail} from "@/types/movie-interfaces";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ movieId: string }> }
) {
    const { movieId } = await params
    const { searchParams } = req.nextUrl;
    const language = searchParams.get('language') || 'en-US';

    if (!language) {
        return NextResponse.json({ success: false, data: null, error: "Missing parameter language" }, { status: 400 })
    }

    const url: string = `${process.env.TMDB_BASE_URL}/movie/${movieId}?append_to_response=credits,recommendations,release_dates,videos,watch/providers`;
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
        const movie: MovieDetail = await data.json();
        return NextResponse.json({ success: true, data: movie, error: null }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ success: false, data: null, error: err }, { status: 500 })
    }
}