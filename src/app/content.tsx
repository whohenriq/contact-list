import { ContactsList } from "./_components/contacts-list";

export function Content() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-background gap-8">
      <ContactsList />
    </main>
  );
}
