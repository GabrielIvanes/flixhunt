import { PersonDetail } from '@/entities/person/person.types';

type Props = {
    person: PersonDetail;
    width: number;
};
export default function HeroSection({ person, width }: Props) {
    return (
        <section className="h-[calc(100vh-7.5rem)] w-full flex gap-2 px-10">
            <div className="flex-1/3 flex justify-center items-center">
                <MovieCard person={Person} width={width} />
            </div>
            <div className="flex-2/3 flex justify-center items-center">
                <div
                    style={{ height: `${width * 1.5}px` }}
                    className="w-full flex flex-col justify-between"
                >
                    <div className="flex flex-col gap-2"></div>
                </div>
            </div>
        </section>
    );
}
