"use client";

import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { SearchBar } from "../search";
import { Menu, PlusCircle, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface NavBarProps {
  isHome?: boolean;
}

export function NavBar({ isHome = false }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const toggleMenuMobile = () => setMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-10 bg-background/70 border-b backdrop-blur px-2">
      <div
        className={cn(
          "flex items-center justify-between px-4",
          isMobile ? "py-4 flex-col items-start gap-2" : "h-16"
        )}
      >
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="text-base lg:text-2xl font-bold">
            Agenda de Contatos
          </Link>

          {isMobile ? (
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button className="p-2" onClick={toggleMenuMobile}>
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {isHome && <SearchBar />}

              {!isMobile && (
                <Button asChild className="sm:p-0">
                  <Link href="/contact/add" className="">
                    <PlusCircle />
                    Adicionar contato
                  </Link>
                </Button>
              )}

              <ModeToggle />
            </div>
          )}
        </div>

        {/* Mobile dropdown */}
        {isMobile && menuOpen && (
          <div className="mt-2 w-full bg-background shadow-md border-t z-20 p-4 flex flex-col gap-4">
            <SearchBar />
            <Button asChild className="w-full justify-start">
              <Link href="/contact/add" onClick={() => setMenuOpen(false)}>
                <PlusCircle className="mr-2" />
                Adicionar contato
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
