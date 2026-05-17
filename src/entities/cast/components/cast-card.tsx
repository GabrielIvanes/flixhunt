import { ReactNode } from 'react';
import { Cast } from '../cast.types';
import PersonCard from '@/entities/person/components/person-card';

type Props = {
    cast: Cast;
    href?: string;
    info?: ReactNode;
    width?: number;
};

export default function CastCard({ cast, href, info, width = 175 }: Props) {
    return <PersonCard person={cast} href={href} info={info} width={width} />;
}
