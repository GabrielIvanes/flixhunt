import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
) {

    const url: string = `${process.env.TMDB_BASE_URL}/configuration`;
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
        const configuration = await data.json();
        return NextResponse.json({ success: true, data: configuration, error: null }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ success: false, data: null, error: err }, { status: 500 })
    }
}