import { ContactCard } from "@/components/contact-card";
import { ContactCardSkeleton } from "@/components/contact-card/contact-card-skeleton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] ">
      <ModeToggle />
      <Search />
      <ContactCard
        contact={{
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          address: "123 Main St, Anytown, USA",
          birthday: "1990-01-01",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }}
      />

      <ContactCardSkeleton />
    </main>
  );
}
