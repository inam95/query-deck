"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TypeFilter } from "./type-filter";
import { useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/search-params";
import { useCallback } from "react";

interface FiltersSidebarProps {
  types: string[];
}
export function FiltersSidebar({ types }: FiltersSidebarProps) {
  const [{ difficulties }, setQueryStates] = useQueryStates(
    {
      difficulties: searchParamsParsers.difficulties,
      page: searchParamsParsers.page,
    },
    { shallow: false }
  );

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

  return (
    <aside className="h-full">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
              Filters
            </h2>
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
