"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";
import { navLinks, authLinks } from "@/lib/constants";
import { motion } from "motion/react";

export function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col gap-0 p-0"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="text-left">QueryDeck</SheetTitle>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex-1 px-6 py-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-medium py-3 block rounded-md px-2 -mx-2 transition-colors",
                      isActive
                        ? "text-primary font-semibold bg-accent"
                        : "text-foreground hover:text-primary hover:bg-accent"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Auth Buttons and Theme Switcher - Fixed at bottom */}
        <div className="px-6 pb-6 pt-4 border-t border-border mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
            className="flex items-center justify-center mb-4"
          >
            <ThemeSwitcher />
          </motion.div>
          <div className="flex flex-col gap-3">
            {authLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: (navLinks.length + index + 1) * 0.05,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "w-full text-center py-3 px-4 rounded-md text-sm font-medium transition-colors block",
                    link.label === "Sign up"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
