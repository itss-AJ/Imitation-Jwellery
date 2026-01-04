import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  type ProductFilters,
  type ProductListResponse,
} from "@/services/product-service";
import { getCategoryIdBySlug } from "@/services/category-service";

export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery<ProductListResponse, Error>({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useProductsInfinite = (
  filters: Omit<ProductFilters, "page" | "limit" | "categoryId"> = {}
) => {
  return useInfiniteQuery<ProductListResponse, Error>({
    queryKey: ["products", "infinite", filters],

    queryFn: ({ pageParam }) =>
      fetchProducts({
        ...filters,
        page: pageParam as number,
        limit: 20,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.meta.currentPage < lastPage.meta.totalPages
        ? lastPage.meta.currentPage + 1
        : undefined,

    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

const useCategoryId = (slug: string) => {
  return useQuery<string | null>({
    queryKey: ["category-id", slug],
    queryFn: () => getCategoryIdBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
};

export const useProductsByCategory = (
  categorySlug: string,
  filters: Omit<ProductFilters, "categoryId" | "page" | "limit"> = {}
) => {
  const { data: categoryId, isLoading } = useCategoryId(categorySlug);

  // check if jewelry set page
  const isJewelrySet = categorySlug === "jewelry-set";

  // categories inside jewelry set
  const jewelrySetSlugs = ["pendant", "earring", "bracelet", "necklace"];

  return useInfiniteQuery<ProductListResponse, Error>({
    queryKey: ["products", "category", categorySlug, filters],

    queryFn: async ({ pageParam }) => {
      // for jewelry set fetch multiple categories
      if (isJewelrySet) {
        const ids = await Promise.all(
          jewelrySetSlugs.map((slug) => getCategoryIdBySlug(slug))
        );

        return fetchProducts({
          ...filters,
          categoryId: ids.filter(Boolean) as string[],
          page: pageParam as number,
          limit: 20,
        });
      }

      // normal single category flow
      return fetchProducts({
        ...filters,
        categoryId: categoryId!,
        page: pageParam as number,
        limit: 20,
      });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.meta.currentPage < lastPage.meta.totalPages
        ? lastPage.meta.currentPage + 1
        : undefined,

    enabled: (isJewelrySet || Boolean(categoryId)) && !isLoading,

    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
