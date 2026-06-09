import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ tvshowId: string; seasonNumber: string, episodeNumber: string }> }
) {
    const { tvshowId } = await params;
    const { seasonNumber } = await params;
    const { episodeNumber } = await params;
    const { searchParams } = req.nextUrl;
    const language = searchParams.get('language') || 'en-US';

    if (!language) {
        return NextResponse.json(
            { success: false, data: null, error: 'Missing parameter language' },
            { status: 400 }
        );
    }

    const url: string = `${process.env.TMDB_BASE_URL}/tv/${tvshowId}/season/${seasonNumber}/episode/${episodeNumber}?language=${language}`;
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
        const episode = await data.json();
        return NextResponse.json(
            { success: true, data: episode, error: null },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, data: null, error: err },
            { status: 500 }
        );
    }
}
