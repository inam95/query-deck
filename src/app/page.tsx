import { FiltersSidebar } from "@/components/filter/filters-sidebar";
import { MobileFilters } from "@/components/filter/mobile-filters";
import { QuestionsLayout } from "@/components/questions/questions-layout";
import { getUniqueTypes } from "@/lib/dal";
import { loadSearchParams } from "@/lib/search-params";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const types = await getUniqueTypes();
  const parsedParams = await loadSearchParams(searchParams);

  return (
    <div className="min-h-screen">
      <MobileFilters types={types} />

      {/* Main Layout Container */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block border-r border-border">
            <FiltersSidebar types={types} />
          </aside>

          {/* Main Content Area */}
          <QuestionsLayout searchParams={parsedParams} />
        </div>
      </div>
    </div>
  );
}
