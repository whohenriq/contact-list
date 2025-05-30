"use client";

import { useState, useMemo } from "react";
import { debounce } from "lodash-es";

export function useSearch() {
  const [query, setQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedQuerySearch = useMemo(
    () => debounce((newQuery: string) => setDebouncedSearch(newQuery), 300),
    [setDebouncedSearch]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newQuery } = e.target;
    setQuery(newQuery);
    debouncedQuerySearch(newQuery);
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedSearch("");
    debouncedQuerySearch.cancel();
  };

  return {
    query,
    setQuery,
    debouncedSearch,
    handleQueryChange,
    clearSearch,
  };
}
