import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
) {
    const { searchParams } = req.nextUrl;
    const language = searchParams.get('language') || 'en-US';
    const page = searchParams.get('page') || "1";
    const genres = searchParams.get('with_genres');
    const decade = searchParams.get('decade');
    const year = searchParams.get('year');


    const voteGte = searchParams.get('vote-gte') || '8000';
    const rateGte = searchParams.get('rate-gte');
    const rateLte = searchParams.get('rate-lte');
    const dateGte = searchParams.get('date-gte');
    const dateLte = searchParams.get('date-lte');
    const providers = searchParams.get('providers');
    const region = searchParams.get('region') || 'FR';
    const keywords = searchParams.get('keywords');
    const cast = searchParams.get('cast');
    const crew = searchParams.get('crew');
    const persons = searchParams.get('persons');

    if (!language) return NextResponse.json({ success: false, data: null, error: "Missing parameter language" }, { status: 400 })


    if (!page) return NextResponse.json({ success: false, data: null, error: "Missing parameter page" }, { status: 400 })

    const url = new URL(`${process.env.TMDB_BASE_URL}discover/movie`);
    url.searchParams.set('include_adult', 'false');
    url.searchParams.set('sort_by', 'vote_average.desc');
    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page);
    if (decade) url.searchParams.set('primary_release_date.gte', `${decade}-01-01`);
    if (decade) url.searchParams.set('primary_release_date.lte', `${Number(decade) + 9}-12-31`);
    if (genres) url.searchParams.set('with_genres', genres);
    if (year) url.searchParams.set('primary_release_year', year);
    if (voteGte) url.searchParams.set('vote_count.gte', voteGte);

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