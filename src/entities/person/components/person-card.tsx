import { ReactNode } from 'react';
import type { PersonBase } from '../person.types';
import PosterCard from '@/shared/components/poster-card';

type Props = {
    person: PersonBase;
    href?: string;
    info?: ReactNode;
    width?: number;
};

export default function PersonCard({ person, href, info, width = 175 }: Props) {
    return (
        <PosterCard
            title={person.name}
            imageUrl={person.profileUrl}
            href={href}
            info={info}
            width={width}
        />
    );
}
