import { ContactsList } from "../_components/contacts-list";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <ContactsList />
    </main>
  );
}
