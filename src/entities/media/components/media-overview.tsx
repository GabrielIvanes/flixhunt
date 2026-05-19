import { H2, P } from '@/shared/ui/typography';

type Props = {
    overview: string;
};

export default function MediaOverview({ overview }: Props) {
    return (
        <div className="flex flex-col min-h-0">
            <H2>Overview</H2>
            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                <P>{overview ? overview : 'There is no overview provided.'}</P>
            </div>
        </div>
    );
}
