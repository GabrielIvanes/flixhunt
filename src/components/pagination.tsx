import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ page, setPage, totalPages }: Props) {
  return (
    <PaginationWrapper>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  setPage(page - 1);
                  window.scrollTo(0, 0);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  setPage(1);
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
                    setPage(page - 1);
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
                    setPage(page + 1);
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
                  setPage(totalPages);
                  window.scrollTo(0, 0);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setPage(page + 1);
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
