import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { Search } from "../search";
import { PlusCircle } from "lucide-react";

export function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-background/70 border-b backdrop-blur">
      <div className="flex h-16 justify-between items-center px-4">
        <h1 className="lg:text-2xl text-base ">Lista de Contatos</h1>
        <div className="flex items-center gap-2">
          <Search />
          <Button>
            <PlusCircle />
            <Link href="/contact/add" className="hidden lg:inline sm:hidden">
              Adicionar contato
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
