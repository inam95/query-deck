import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TypeFilter } from "./type-filter";

interface FiltersSidebarProps {
  types: string[];
}
export function FiltersSidebar({ types }: FiltersSidebarProps) {
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
              {[1, 2, 3].map((level) => (
                <div key={level}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                  >
                    {level}
                  </Button>
                </div>
              ))}
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
