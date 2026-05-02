import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const language = searchParams.get('language') || 'en-US';
    const page = searchParams.get('page') || 1;
    const query = searchParams.get('query') || '';

    console.log('page:', page);

    if (!language) {
        return NextResponse.json(
            { success: false, data: null, error: 'Missing parameter language' },
            { status: 400 }
        );
    }

    if (!page) {
        return NextResponse.json(
            { success: false, data: null, error: 'Missing parameter page' },
            { status: 400 }
        );
    }

    const url = new URL(`${process.env.TMDB_BASE_URL}/search/person`);
    url.searchParams.set('include_adult', 'false');
    url.searchParams.set('query', query);
    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page.toString());
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
        const persons = await data.json();
        return NextResponse.json(
            { success: true, data: persons, error: null },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, data: null, error: err },
            { status: 500 }
        );
    }
}
