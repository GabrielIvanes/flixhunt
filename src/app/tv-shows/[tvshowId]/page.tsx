import {getTvshowDetails} from "@/lib/tvshows";
import {TvshowDetail} from "@/types/tvshow-interfaces";
import Image from "next/image";
import Element from "@/components/ui/element";
import {Element as ElementInterface} from "@/types/global-interfaces";
import {H1} from "@/components/ui/typography";
import {mediaToElement, providerToElement} from "@/lib/utils";
import {Configuration} from "@/types/tmdb-interfaces";
import {getConfiguration} from "@/lib/tmdb";

export default async function Tvshow({params}: { params: Promise<{ tvshowId: string }> }) {
    const {tvshowId} = await params;
    const width = 370;
    const height = 370 * 1.5;
    const countryCode = "FR";

    const configuration: Configuration = await getConfiguration();
    const tvshow: TvshowDetail = await getTvshowDetails(tvshowId);
    console.log(tvshow);

    const tvShowElement: ElementInterface = mediaToElement(tvshow, "tv-show", configuration, width, height, false, false, false);
    const voteAverage = tvshow.vote_average?.toPrecision(2)
    const providers = tvshow['watch/providers']?.results[countryCode]?.flatrate;
    const providerElements: ElementInterface[] = providers?.map((provider) => providerToElement(provider, configuration, 45, 45));

    return (
        <>
            <div className="top-0 z-0 !bg-neutral-900 fixed inset-0">
                <Image src={`${configuration.images.secure_base_url}original${tvshow.backdrop_path}`} alt={tvshow.name}
                       fill={true} sizes={'100vw'} className="object-cover opacity-20"/>
            </div>
            <div className="w-full h-screen flex z-10">
                <div className="flex justify-center items-center flex-1/3">
                    <Element element={tvShowElement}/>
                </div>
                <div className="flex-2/3 flex justify-center items-center">
                    <div className="mx-2 w-full flex flex-col justify-between"
                         style={{height: `${height}px`, maxHeight: `${height}px`}}>
                        <div className="flex flex-col flex-1 min-h-0">
                            <H1 text={tvShowElement.name}/>
                            <div className="flex items-center gap-1 mb-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}