import { useSearchParams } from "react-router-dom";
import { useScrollToTopOnPageChange } from "./useScrollToTopOnPageChange";

interface UsePaginationProps<T> {
  items: T[];
  qtyPerPage: number;
}

export function usePagination<T>({ items, qtyPerPage }: UsePaginationProps<T>) {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const startIndex = (currentPage - 1) * qtyPerPage;
  const endIndex = startIndex + qtyPerPage;

  const currentItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / qtyPerPage);

  // Para volver arriba al cambiar de pagina
  useScrollToTopOnPageChange(currentPage);

  return {
    currentPage,
    currentItems,
    totalPages,
  };
}
