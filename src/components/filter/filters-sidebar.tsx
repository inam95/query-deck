"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TypeFilter } from "./type-filter";
import { useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/search-params";
import { useCallback, useMemo } from "react";
import { X } from "lucide-react";

interface FiltersSidebarProps {
  types: string[];
}
export function FiltersSidebar({ types }: FiltersSidebarProps) {
  // Hook for managing all filters
  const [
    { q, sort, order, types: selectedTypes, difficulties },
    setQueryStates,
  ] = useQueryStates(
    {
      q: searchParamsParsers.q,
      sort: searchParamsParsers.sort,
      order: searchParamsParsers.order,
      types: searchParamsParsers.types,
      difficulties: searchParamsParsers.difficulties,
      page: searchParamsParsers.page,
    },
    { shallow: false }
  );

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      (q && q.trim() !== "") ||
      (selectedTypes && selectedTypes.length > 0) ||
      (difficulties && difficulties.length > 0) ||
      sort !== "votes" ||
      order !== "desc"
    );
  }, [q, selectedTypes, difficulties, sort, order]);

  const handleDifficultyToggle = useCallback(
    (level: number) => {
      const currentDifficulties = difficulties || [];
      const isSelected = currentDifficulties.includes(level);
      const newDifficulties = isSelected
        ? currentDifficulties.filter((d) => d !== level)
        : [...currentDifficulties, level];

      setQueryStates({
        difficulties: newDifficulties.length > 0 ? newDifficulties : null,
        page: 1,
      });
    },
    [difficulties, setQueryStates]
  );

  const handleClearAllFilters = useCallback(() => {
    setQueryStates({
      q: null,
      sort: null,
      order: null,
      types: null,
      difficulties: null,
      page: 1,
    });
  }, [setQueryStates]);

  return (
    <aside className="h-full">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border">
            <h2 className="text-lg font-semibold text-foreground  pb-2 flex-1">
              Filters
            </h2>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                title="Clear all filters"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((level) => {
                const isSelected = difficulties?.includes(level) || false;
                return (
                  <div key={level}>
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="icon"
                      className="h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleDifficultyToggle(level)}
                    >
                      {level}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <TypeFilter types={types} />
          </div>
        </div>
      </div>
    </aside>
  );
}
