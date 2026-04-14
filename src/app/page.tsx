import {Configuration, TMDBResponse} from "@/types/tmdb-interfaces";
import {getConfiguration} from "@/lib/tmdb";
import {getPopularMovies} from "@/lib/movies";
import {mediaToElement} from "@/lib/utils";
import {Element as ElementInterface} from "@/types/global-interfaces";
import {MovieSummary} from "@/types/movie-interfaces";
import {CarouselList} from "@/components/carousel";

export default async function Home() {
    const configuration: Configuration = await getConfiguration();
    const popularMovies: TMDBResponse<MovieSummary> = await getPopularMovies();
    const popularMoviesElements: ElementInterface[] = popularMovies.results.map((movie) => mediaToElement(movie, "movie", configuration, 175, 175 * 1.5, true, false, false));
    return (
        <CarouselList elements={popularMoviesElements} title='Popular Movies' loop={true}/>
    );
}
