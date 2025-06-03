import { NavBar } from "@/components/navbar";
import { ContactsList } from "./_components/contacts-list";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main>
        <ContactsList />
      </main>
    </div>
  );
}
