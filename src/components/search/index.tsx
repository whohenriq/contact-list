"use client";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "./useSearch";

export function SearchBar() {
  const { query, clearSearch, handleQueryChange } = useSearch();

  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Pesquisar contato"
        value={query}
        onChange={handleQueryChange}
        className="pl-10 pr-10 w-full"
      />

      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full aspect-square rounded-l-none"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
