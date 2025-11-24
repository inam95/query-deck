"use client";

import { Search, ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/search-params";
import { useCallback } from "react";

const sortOptions = [
  { value: "votes", label: "Votes" },
  { value: "title", label: "Title" },
  { value: "difficulty", label: "Difficulty" },
] as const;

export function FacetFilter() {
  const [{ q, sort, order }, setQueryStates] = useQueryStates(
    {
      q: searchParamsParsers.q,
      sort: searchParamsParsers.sort,
      order: searchParamsParsers.order,
      page: searchParamsParsers.page,
    },
    { shallow: false }
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQueryStates({ q: value || null, page: 1 });
    },
    [setQueryStates]
  );

  const handleSortChange = useCallback(() => {
    const currentIndex = sortOptions.findIndex((opt) => opt.value === sort);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setQueryStates({
      sort: sortOptions[nextIndex].value,
      page: 1,
    });
  }, [sort, setQueryStates]);

  const handleOrderToggle = useCallback(() => {
    setQueryStates({
      order: order === "asc" ? "desc" : "asc",
      page: 1,
    });
  }, [order, setQueryStates]);

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sort)?.label || "Votes";
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="pl-10"
            value={q || ""}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 h-9"
            onClick={handleSortChange}
          >
            {currentSortLabel}
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3"
            onClick={handleOrderToggle}
            title={`Sort ${order === "asc" ? "Ascending" : "Descending"}`}
          >
            {order === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
