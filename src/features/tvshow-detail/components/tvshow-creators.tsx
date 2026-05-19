import { TvshowDetail } from '@/entities/tvshow/types/tvshow.types';
import PointSeparator from '@/shared/ui/point-separator';
import { Accent, H2, P } from '@/shared/ui/typography';
import Link from 'next/link';

type Props = {
    tvshow: TvshowDetail;
};

export default function TvshowCreators({ tvshow }: Props) {
    const creators = tvshow.createdBy;

    if (creators.length === 0)
        return (
            <div>
                <H2 className="mb-1">Creators</H2>
                <P>There is no creator provided.</P>
            </div>
        );

    return (
        <div>
            <H2 className="mb-1">Creators</H2>
            <div className="flex items-center gap-1">
                {creators.map((creator, index: number) => (
                    <div key={creator.id} className="flex items-center gap-1">
                        {index > 0 && <PointSeparator />}
                        <Link href={`/persons/${creator.id}`} passHref>
                            <Accent>{creator.name}</Accent>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
