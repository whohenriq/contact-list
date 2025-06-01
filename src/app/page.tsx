import { ContactsList } from "./_components/contacts-list";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-full min-h-screen bg-background gap-8">
      <ContactsList />
    </main>
  );
}
