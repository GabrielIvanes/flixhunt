import {
    Pagination as PaginationWrapper,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/shared/ui/pagination';

type Props = {
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
};

export default function Pagination({ page, totalPages, setPage }: Props) {
    if (totalPages === 0 || totalPages === 1) return null;
    if (totalPages > 500) totalPages = 500;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <PaginationWrapper>
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(page - 1)}
                        />
                    </PaginationItem>
                )}

                {page > 2 && (
                    <>
                        <PaginationItem>
                            <PaginationLink onClick={() => handlePageChange(1)}>
                                1
                            </PaginationLink>
                        </PaginationItem>

                        {page > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}

                {page > 1 && (
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(page - 1)}
                        >
                            {page - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>

                {page < totalPages && (
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {page < totalPages - 1 && (
                    <>
                        {page < totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationLink
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {page < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(page + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </PaginationWrapper>
    );
}
