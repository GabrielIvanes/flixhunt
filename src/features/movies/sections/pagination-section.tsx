'use client';

import Pagination from '@/shared/components/pagination';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
    defaultPage: number;
    totalPages: number;
    mediaType: 'movie' | 'tvshow' | 'person';
};

export default function PaginationSection({
    defaultPage,
    totalPages,
    mediaType,
}: Props) {
    const [page, setPage] = useState(defaultPage);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setPage(defaultPage);
    }, [defaultPage]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        const params = new URLSearchParams(searchParams.toString());
        if (newPage != 1) params.set('page', newPage.toString());
        else params.delete('page');

        router.push(
            `/${mediaType}s${params.toString() ? `?${params.toString()}` : ''}`
        );
    };

    return (
        <section>
            <Pagination
                page={page}
                totalPages={totalPages}
                setPage={handlePageChange}
            />
        </section>
    );
}
