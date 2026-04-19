import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
) {
    const { searchParams } = req.nextUrl;
    const language = searchParams.get('language') || 'en-US';

    if (!language) {
        return NextResponse.json({ success: false, data: null, error: "Missing parameter language" }, { status: 400 })
    }

    const url = `${process.env.TMDB_BASE_URL}/genre/movie/list?language=${language}`;

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
        const movies = await data.json();
        return NextResponse.json({ success: true, data: movies, error: null }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ success: false, data: null, error: err }, { status: 500 })
    }
}