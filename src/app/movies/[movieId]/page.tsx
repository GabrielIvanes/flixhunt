import {getMovieDetails} from "@/lib/movies";
import {MovieDetail} from "@/types/movie-interfaces";
import Image from "next/image";
import {getConfiguration} from "@/lib/tmdb";
import {Configuration} from "@/types/tmdb-interfaces";
import Element from "@/components/ui/element";
import {formatTime, getDirectors, movieToElement, providerToElement} from "@/lib/utils";
import {H1, H3, Lead, LinkP, MutedP, P} from "@/components/ui/typography";
import {Genre} from "@/types/global-interfaces";
import Separator from "@/components/ui/separator";
import {Bookmark, Clapperboard, Eye, Heart, List, Play, SquarePen} from "lucide-react"
import {Button} from "@/components/ui/button";
import {CarouselList} from "@/components/carousel";

export default async function Movie({params}: { params: Promise<{ movieId: string }> }) {
    const {movieId} = await params;
    const width = 370;
    const height = 370 * 1.5;
    const countryCode = "FR";

    const configuration: Configuration = await getConfiguration();
    const movie: MovieDetail = await getMovieDetails(movieId);
    console.log(movie);

    const movieElement: Element = movieToElement(movie, configuration, width, height, false, false, false);
    const directors = getDirectors(movie.credits.crew);
    const release_date = movie.release_dates?.results.filter(
        (result) => result.iso_3166_1 === countryCode
    )[0]?.release_dates[0]?.release_date;
    const releaseDate = release_date ? release_date.split('-')[0] : movie.release_date ? movie.release_date.split('-')[0] : '';
    const duration = formatTime(movie.runtime);
    const voteAverage = movie.vote_average?.toPrecision(2)
    const providers = movie['watch/providers']?.results[countryCode]?.flatrate;
    const providerElements: Element[] = providers?.map((provider) => providerToElement(provider, configuration, 45, 45));

    const recommendationElements: Element[] = movie.recommendations.results.map((recommendation) => movieToElement(recommendation, configuration, 175, 175 * 1.5, true, false, false))

    return (
        <>
            <div className="top-0 z-0 !bg-neutral-900 fixed inset-0">
                <Image src={`${configuration.images.secure_base_url}w1280${movie.backdrop_path}`} alt={movie.title}
                       fill={true} sizes={'100vw'} className="object-cover opacity-20"/>
            </div>
            <div className="w-full h-screen flex z-10 mb-10">
                <div className="flex justify-center items-center flex-1/3">
                    <Element element={movieElement}/>
                </div>
                <div className="flex-2/3 flex justify-center items-center">
                    <div className="mx-2 w-full flex flex-col justify-between"
                         style={{height: `${height}px`, maxHeight: `${height}px`}}>
                        <div className="flex flex-col flex-1 min-h-0">
                            <H1 text={movieElement.name}/>
                            <div className="flex items-center gap-1 mb-2">
                                {releaseDate &&
                                    <div className="flex gap-1">
                                        <MutedP text={releaseDate}/>
                                    </div>}
                                {duration &&
                                    <div className="flex  items-center gap-1">
                                        {releaseDate && <Separator/>}
                                        <MutedP text={duration}/>
                                    </div>}
                                {voteAverage &&
                                    <div className="flex  items-center gap-1">
                                        {(releaseDate || duration) && <Separator/>}
                                        <MutedP text={`${voteAverage}/10`}/>
                                    </div>}
                                {movie.genres.map((genre: Genre, index: number) => (
                                    <div className="flex items-center gap-1" key={genre.id}>
                                        {index === 0 ? (releaseDate || duration || voteAverage) && <Separator/> :
                                            <Separator/>}
                                        <LinkP text={genre.name} classname="text-sm"/>
                                    </div>
                                ))}
                            </div>
                            <H3 text="Directors"/>
                            <div className="flex items-center">
                                {directors && directors.length > 0 ? directors.map((director, index: number) => (
                                    <div key={director.id} className="flex">
                                        <LinkP text={director.name}/>
                                        {index != directors.length - 1 && <span>,&nbsp;</span>}
                                    </div>
                                )) : <P text="There is no director provided."/>}
                            </div>
                            <Lead text={movie.tagline}/>
                            <H3 text="Overview"/>
                            <div className="min-h-0 overflow-y-auto pr-2">
                                <P text={movie.overview ? movie.overview : "There is no overview provided."} />
                            </div>

                            <div className="flex gap-1 items-center mt-5">
                                <Button variant={'ghost'} className="cursor-pointer">
                                    <Play/>
                                    <span className="text-foreground">Run Trailer</span>
                                </Button>
                                <Button size={'icon'} variant={'outline'} className="cursor-pointer">
                                    <Heart fill="currentColor"/>
                                </Button>
                                <Button size={'icon'} variant={'outline'} className="cursor-pointer">
                                    <Bookmark/>
                                </Button>
                                <Button size={'icon'} variant={'outline'} className="cursor-pointer">
                                    <Eye/>
                                    {/*<EyeOff />*/}
                                </Button>
                                <Button size={'icon'} variant={'outline'} className="cursor-pointer">
                                    <Clapperboard fill="currentColor"/>
                                </Button>
                                <Button size={'icon'} variant={'outline'} className="cursor-pointer">
                                    <List/>
                                </Button>
                                <Button size={'icon'} variant={'outline'} className="cursor-pointer">
                                    <SquarePen/>
                                </Button>
                            </div>
                        </div>
                        {providers && providers.length > 0 && <div className="flex flex-col gap-1">
                            <H3 text="Streaming"/>
                            <div className="flex gap-2">
                                {providerElements.map((provider) => (
                                    <Element key={provider.id} element={provider}/>
                                ))}
                            </div>

                        </div>}
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <CarouselList elements={recommendationElements} title="Recommendations" />
            </div>
        </>

    );
}
