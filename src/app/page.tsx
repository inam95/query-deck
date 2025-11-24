import { FiltersSidebar } from "@/components/filters-sidebar";
import { MobileFilters } from "@/components/mobile-filters";
import { QuestionsLayout } from "@/components/questions/questions-layout";
import { getUniqueTypes } from "@/lib/dal";

export default async function Home() {
  const types = await getUniqueTypes();

  return (
    <div className="min-h-screen">
      <MobileFilters />

      {/* Main Layout Container */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block border-r border-border">
            <FiltersSidebar />
          </aside>

          {/* Main Content Area */}
          <QuestionsLayout />
        </div>
      </div>
    </div>
  );
}
