import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const language = searchParams.get('language') || 'en-US';
    const region = searchParams.get('region') || 'FR';
    const mediaType = searchParams.get('media_type');

    if (!mediaType)
        return NextResponse.json(
            {
                success: false,
                data: null,
                error: 'Missing parameter media_type',
            },
            { status: 400 }
        );
    if (mediaType !== 'movie' && mediaType !== 'tv')
        return NextResponse.json(
            {
                success: false,
                data: null,
                error: "Invalid parameter media_type. Must be 'movie' or 'tv'",
            },
            { status: 400 }
        );

    const url = new URL(`${process.env.TMDB_BASE_URL}/watch/providers/${mediaType}`);
    url.searchParams.set('watch_region', region);
    url.searchParams.set('language', language);

    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
        cache: 'force-cache',
    };

    try {
        const data = await fetch(url, options);
        const providers = await data.json();
        console.log('providers:', providers);
        return NextResponse.json(
            { success: true, data: providers, error: null },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, data: null, error: err },
            { status: 500 }
        );
    }
}
