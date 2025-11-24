"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { motion } from "motion/react";
import { FiltersSidebar } from "@/components/filters-sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function MobileFilters() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="md:hidden sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-3">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:max-w-[280px] p-0">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="p-4">
              <FiltersSidebar />
            </div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
