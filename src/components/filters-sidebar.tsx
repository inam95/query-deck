"use client";

import { motion } from "motion/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function FiltersSidebar() {
  return (
    <aside className="h-full">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
              Filters
            </h2>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((level) => (
                <motion.div
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    {level}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Type</h3>
            <div className="space-y-2">
              {["Type 1", "Type 2", "Type 3"].map((type, index) => (
                <motion.label
                  key={type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <Checkbox id={type.toLowerCase().replace(" ", "-")} />
                  <span className="text-sm group-hover:text-accent-foreground transition-colors">
                    {type}
                  </span>
                </motion.label>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
