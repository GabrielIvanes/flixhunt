import PersonDetailPage from '@/features/person-detail/person-detail-page';

export default async function Person({
    params,
}: {
    params: Promise<{ personId: string }>;
}) {
    const { personId } = await params;

    return <PersonDetailPage personId={Number(personId)} />;
}
