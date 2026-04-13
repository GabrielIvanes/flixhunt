import {getMovieDetails} from "@/lib/movies";
import {MovieDetail} from "@/types/movie-interfaces";
import Image from "next/image";
import {getConfiguration} from "@/lib/tmdb";
import {Configuration} from "@/types/tmdb-interfaces";
import Element from "@/components/ui/element";
import {formatTime, movieToElement, personToElement, providerToElement} from "@/lib/utils";
import {getCast, getCrew, getDirectors} from "@/services/persons";
import {H1, H3, Lead, LinkP, MutedP, P} from "@/components/ui/typography";
import {Genre, Element as ElementInterface} from "@/types/global-interfaces";
import Separator from "@/components/ui/separator";
import {Bookmark, Clapperboard, Eye, Heart, List, Play, SquarePen} from "lucide-react"
import {Button} from "@/components/ui/button";
import {CarouselList} from "@/components/carousel";
import {Cast, Crew} from "@/types/person-interfaces";
import Link from "next/link";

export default async function Movie({params}: { params: Promise<{ movieId: string }> }) {
    const {movieId} = await params;
    const width = 370;
    const height = 370 * 1.5;
    const countryCode = "FR";

    const configuration: Configuration = await getConfiguration();
    const movie: MovieDetail = await getMovieDetails(movieId);
    console.log(movie);

    const movieElement: ElementInterface = movieToElement(movie, configuration, width, height, false, false, false);
    const directors: Crew[] = getDirectors(movie.credits.crew);
    const release_date = movie.release_dates.results.find((result) => result.iso_3166_1 === countryCode)?.release_dates?.find((release_date) => release_date.type === 3)?.release_date
    const releaseDate = release_date ? release_date.split('-')[0] : movie.release_date ? movie.release_date.split('-')[0] : '';
    const duration = formatTime(movie.runtime);
    const voteAverage = movie.vote_average?.toPrecision(2)
    const providers = movie['watch/providers']?.results[countryCode]?.flatrate;
    const providerElements: ElementInterface[] = providers?.map((provider) => providerToElement(provider, configuration, 45, 45));

    const cast: Cast[] = getCast(movie.credits.cast);
    const crew: Crew[] = getCrew(movie.credits.crew);
    const castElements: ElementInterface[] = cast.map((c) => personToElement(c, configuration, 175, 175 * 1.5, true, true, true))
    const crewElements: ElementInterface[] = crew.map((c) => personToElement(c, configuration, 175, 175 * 1.5, true, true, true))
    const recommendationElements: ElementInterface[] = movie.recommendations.results.map((recommendation) => movieToElement(recommendation, configuration, 175, 175 * 1.5, true, false, false))

    return (
        <>
            <div className="top-0 z-0 !bg-neutral-900 fixed inset-0">
                <Image src={`${configuration.images.secure_base_url}original${movie.backdrop_path}`} alt={movie.title}
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
                                    <div className="flex items-center gap-1">
                                        {releaseDate && <Separator/>}
                                        <MutedP text={duration}/>
                                    </div>}
                                {voteAverage &&
                                    <div className="flex items-center gap-1">
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
                                        <Link href={`/persons/${director.id}`} passHref><LinkP text={director.name}/></Link>
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

            <div className="mb-5 z-10 flex flex-col gap-5">
                <CarouselList elements={castElements} title="Cast" />
                <CarouselList elements={crewElements} title="Crew" />
                <CarouselList elements={recommendationElements} title="Recommendations" />
            </div>
        </>

    );
}
