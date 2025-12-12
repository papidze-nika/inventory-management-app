import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({ ...searchParams, page: String(page) });
    return `${baseUrl}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1">
      {currentPage <= 1 ? (
        <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-500">
          <ChevronLeft className="w-4 h-4" /> Previous
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Link>
      )}

      {visiblePages.map((page, key) => {
        if (page === "...") {
          return (
            <span key={key} className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isCurrentPage = pageNumber === currentPage;

        return (
          <Link
            key={key}
            href={getPageUrl(pageNumber)}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              isCurrentPage
                ? "bg-purple-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage >= totalPages ? (
        <span className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-500">
          Next <ChevronRight className="w-4 h-4" />
        </span>
      ) : (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
        >
          Next <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  );
}