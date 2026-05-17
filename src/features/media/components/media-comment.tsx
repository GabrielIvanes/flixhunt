import { H1, P } from '@/shared/ui/typography';

type Props = {
    comment: string | null;
};

export default function MediaComment({ comment }: Props) {
    if (!comment) return null;
    return (
        <section className="px-20 mb-5">
            <H1>Your comment</H1>
            <P>{comment}</P>
        </section>
    );
}
