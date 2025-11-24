"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { capitalizeType } from "@/lib/utils";
import { useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/lib/search-params";
import { useCallback } from "react";

interface TypeFilterProps {
  types: string[];
}
export function TypeFilter({ types }: TypeFilterProps) {
  const [{ types: selectedTypes }, setQueryStates] = useQueryStates(
    {
      types: searchParamsParsers.types,
      page: searchParamsParsers.page,
    },
    { shallow: false }
  );

  const handleTypeToggle = useCallback(
    (type: string) => {
      const currentTypes = selectedTypes || [];
      const isSelected = currentTypes.includes(type);
      const newTypes = isSelected
        ? currentTypes.filter((t) => t !== type)
        : [...currentTypes, type];

      setQueryStates({
        types: newTypes.length > 0 ? newTypes : null,
        page: 1,
      });
    },
    [selectedTypes, setQueryStates]
  );

  return (
    <>
      <h3 className="text-sm font-medium text-foreground">Type</h3>
      <div className="space-y-2">
        {types.map((type) => {
          const isChecked = selectedTypes?.includes(type) || false;
          return (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                id={type.toLowerCase().replace(" ", "-")}
                checked={isChecked}
                onCheckedChange={() => handleTypeToggle(type)}
              />
              <span className="text-sm group-hover:text-accent-foreground transition-colors">
                {capitalizeType(type)}
              </span>
            </label>
          );
        })}
      </div>
    </>
  );
}
