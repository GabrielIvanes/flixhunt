import * as React from "react"

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import {Element as ElementInterface} from "@/types/global-interfaces"
import Element from "@/components/ui/element";
import {H1} from "@/components/ui/typography";

interface Props {
    elements: ElementInterface[]
    title: string
    loop?: boolean
}

export function CarouselList({elements, title, loop}: Props) {
    return (
        <div className='px-20'>
            <H1 text={title}/>
            <Carousel
                opts={{
                    align: "start",
                    loop: loop || false,
                }}
            >
                <CarouselContent className="-ml-3">
                    {elements.map((element) => (
                        <CarouselItem key={element.id} className="pl-3 basis-auto">
                            <Element element={element}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious style={{top: elements[0].height / 2}}/>
                <CarouselNext style={{top: elements[0].height / 2}}/>
            </Carousel>

        </div>
    )
}
