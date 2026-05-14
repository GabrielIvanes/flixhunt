import TrendingMoviesSection from '@/features/home/sections/trending-movies-section';
import PopularMoviesSection from '@/features/home/sections/popular-movies-section';
import TheatreMoviesSection from '@/features/home/sections/theatre-movies-section';
import PopularTvSection from '@/features/home/sections/popular-tv-section';
import TrendingTvSection from '@/features/home/sections/trending-tv-sections';

export default async function Home() {
    return (
        <div className="flex flex-col gap-10 pb-10">
            <TheatreMoviesSection />
            <TrendingTvSection />
            <TrendingMoviesSection />
            <PopularTvSection />
            <PopularMoviesSection />
        </div>
    );
}
