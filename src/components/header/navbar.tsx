"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavbar } from "./mobile-navbar";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "../theme-switcher";
import { navLinks, authLinks } from "@/lib/constants";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-xl text-foreground hover:text-primary transition-colors"
          >
            <span className="font-bold">QueryDeck</span>
          </Link>
        </motion.div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeNavLink"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <ThemeSwitcher />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={authLinks[0].href}>
              <Button variant="ghost" size="sm">
                {authLinks[0].label}
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={authLinks[1].href}>
              <Button size="sm">{authLinks[1].label}</Button>
            </Link>
          </motion.div>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher />
          <MobileNavbar />
        </div>
      </nav>
    </header>
  );
}
