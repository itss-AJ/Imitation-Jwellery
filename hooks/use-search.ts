"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProducts, searchAll, type SearchResult } from "@/services/search-service";
import { useState, useMemo } from "react";

export const useSearch = (query: string, enabled = true) => {
  return useQuery<SearchResult[]>({
    queryKey: ["search", query],
    queryFn: () => searchProducts(query),
    enabled: enabled && query.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSearchState = () => {
  const [query, setQuery] = useState("");
  const { data: results = [], isLoading } = useSearch(query);

  return {
    query,
    setQuery,
    results,
    isLoading,
    hasResults: results.length > 0,
  };
};
