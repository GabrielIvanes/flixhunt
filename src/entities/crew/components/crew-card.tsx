import { ReactNode } from 'react';
import { Crew } from '../crew.types';
import PersonCard from '@/entities/person/components/person-card';

type Props = {
    crew: Crew;
    href?: string;
    info?: ReactNode;
    width?: number;
};

export default function CrewCard({ crew, href, info, width = 175 }: Props) {
    return <PersonCard person={crew} href={href} info={info} width={width} />;
}
