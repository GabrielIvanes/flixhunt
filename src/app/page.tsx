import {Configuration, TMDBResponse} from "@/types/tmdb-interfaces";
import {getConfiguration} from "@/lib/tmdb";
import {getPopularMovies, getTheatreMovies} from "@/lib/movies";
import {mediaToElement} from "@/lib/utils";
import {Element as ElementInterface} from "@/types/global-interfaces";
import {MovieSummary} from "@/types/movie-interfaces";
import {CarouselList} from "@/components/carousel";

export default async function Home() {
    const configuration: Configuration = await getConfiguration();
    const popularMovies: TMDBResponse<MovieSummary> = await getPopularMovies();
    const theatreMovies: TMDBResponse<MovieSummary> = await getTheatreMovies();
    const popularMoviesElements: ElementInterface[] = popularMovies.results.map((movie) => mediaToElement(movie, "movie", configuration, 175, 175 * 1.5, true, false, false));
    const theatreMoviesElements: ElementInterface[] = theatreMovies.results.map((movie) => mediaToElement(movie, "movie", configuration, 175, 175 * 1.5, true, false, false));
    return (
        <div className="pt-12 flex flex-col gap-4">
            <CarouselList elements={popularMoviesElements} title='Popular Movies' loop={true}/>
            <CarouselList elements={theatreMoviesElements} title='Theatre Movies' loop={true}/>
        </div>
    );
}
