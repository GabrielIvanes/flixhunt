import {
    Pagination as PaginationWrapper,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { handlePageChange } from '@/services/media';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface Props {
    totalPages: number;
    page: number;
    media: 'movies' | 'tvs' | 'persons';
    searchParams: ReadonlyURLSearchParams;
    router: AppRouterInstance;
}

export default function Pagination({
    page,
    totalPages,
    media,
    searchParams,
    router,
}: Props) {
    if (totalPages > 500) totalPages = 500;

    return (
        <PaginationWrapper>
            <PaginationContent>
                {page > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => {
                                    handlePageChange(
                                        page - 1,
                                        media,
                                        searchParams,
                                        router
                                    );
                                    window.scrollTo(0, 0);
                                }}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => {
                                    handlePageChange(
                                        1,
                                        media,
                                        searchParams,
                                        router
                                    );
                                    window.scrollTo(0, 0);
                                }}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {page > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        {page > 2 && (
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => {
                                        handlePageChange(
                                            page - 1,
                                            media,
                                            searchParams,
                                            router
                                        );
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {page - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </>
                )}
                <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                {page < totalPages && (
                    <>
                        {page + 1 < totalPages && (
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => {
                                        handlePageChange(
                                            page + 1,
                                            media,
                                            searchParams,
                                            router
                                        );
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {page + 2 < totalPages && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => {
                                    handlePageChange(
                                        totalPages,
                                        media,
                                        searchParams,
                                        router
                                    );
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => {
                                    handlePageChange(
                                        page + 1,
                                        media,
                                        searchParams,
                                        router
                                    );
                                    window.scrollTo(0, 0);
                                }}
                            />
                        </PaginationItem>
                    </>
                )}
            </PaginationContent>
        </PaginationWrapper>
    );
}
