"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { debounce } from "lodash-es";

type SearchContextType = {
  query: string;
  debouncedSearch: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedQuerySearch = useMemo(
    () => debounce((newQuery: string) => setDebouncedSearch(newQuery), 300),
    []
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    debouncedQuerySearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedSearch("");
    debouncedQuerySearch.cancel();
  };

  const value = {
    query,
    debouncedSearch,
    handleQueryChange,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de SearchProvider");
  }
  return context;
}
