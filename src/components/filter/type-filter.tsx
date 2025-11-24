import { Checkbox } from "@/components/ui/checkbox";
import { capitalizeType } from "@/lib/utils";

interface TypeFilterProps {
  types: string[];
}
export function TypeFilter({ types }: TypeFilterProps) {
  return (
    <>
      <h3 className="text-sm font-medium text-foreground">Type</h3>
      <div className="space-y-2">
        {types.map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Checkbox id={type.toLowerCase().replace(" ", "-")} />
            <span className="text-sm group-hover:text-accent-foreground transition-colors">
              {capitalizeType(type)}
            </span>
          </label>
        ))}
      </div>
    </>
  );
}
