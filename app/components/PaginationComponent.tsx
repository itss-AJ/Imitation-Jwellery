"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  onPageChange?: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  onPageChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalRecords);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex sm:items-center sm:justify-center gap-4 mt-6 md:mt-10">
      
      {/* PAGINATION BUTTONS */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* PREV Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className={clsx(
            "h-9 w-9 rounded-lg flex items-center justify-center border",
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-brand hover:text-background"
          )}
        >
          <ChevronLeft size={16} />
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={clsx(
              "h-9 min-w-[36px] px-3 rounded-lg border text-sm font-medium transition",
              page === currentPage
                ? "bg-brand text-background border-brand"
                : "hover:bg-brand/10"
            )}
          >
            {page}
          </button>
        ))}

        {/* NEXT Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className={clsx(
            "h-9 w-9 rounded-lg flex items-center justify-center border",
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-brand hover:text-background"
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
