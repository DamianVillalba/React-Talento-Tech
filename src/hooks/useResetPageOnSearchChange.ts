import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useResetPageOnSearchChange = (
  searchTerm: string,
  shouldPaginate: boolean
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!shouldPaginate) return;

    if (searchParams.get("page") !== "1") {
      searchParams.set("page", "1");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchTerm, shouldPaginate]);
};