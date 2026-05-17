import { Genre } from '@/entities/genre/genre.types';
import PointSeparator from '@/shared/ui/point-separator';
import { Accent, Muted } from '@/shared/ui/typography';
import Link from 'next/link';

type Props = {
    PlaceOfBirth?: string | null;
    knownForDepartment?: string | null;
    date?: string | null;
};

export default function PersonMetadata({
    PlaceOfBirth,
    knownForDepartment,
    date,
}: Props) {
    const items = [
        date ? <Muted>{date}</Muted> : null,
        knownForDepartment ? <Muted>{knownForDepartment}</Muted> : null,
        PlaceOfBirth ? <Muted>{PlaceOfBirth}</Muted> : null,
    ].filter(Boolean);

    return (
        <div className="flex flex-wrap items-center gap-1">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                    {index > 0 && <PointSeparator />}
                    {item}
                </div>
            ))}
        </div>
    );
}
