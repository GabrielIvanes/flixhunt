import { H1, P } from '@/shared/ui/typography';

type Props = {
    comment: string | null;
};

export default function MediaComment({ comment }: Props) {
    if (!comment) return null;
    return (
        <section className="mb-5 px-20">
            <H1>Your comment</H1>
            <P>{comment}</P>
        </section>
    );
}
