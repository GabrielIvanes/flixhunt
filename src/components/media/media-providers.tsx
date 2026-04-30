import { Element as ElementInterface } from '@/types/global-interfaces';
import Element from '@/components/ui/element';
import { H3 } from '@/components/ui/typography';
interface Props {
    providerElements: ElementInterface[];
}

export default function MediaProviders({ providerElements }: Props) {
    return (
        providerElements &&
        providerElements.length > 0 && (
            <div className="flex flex-col gap-1">
                <H3 text="Streaming" />
                <div className="flex gap-2">
                    {providerElements.map((provider) => (
                        <Element key={provider.id} element={provider} />
                    ))}
                </div>
            </div>
        )
    );
}
