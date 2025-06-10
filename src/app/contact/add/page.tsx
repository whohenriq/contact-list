import { ContactForm } from "@/components/contact-form";

export default function AddContactPage() {
  return (
    <main className="flex items-center justify-center h-full w-full mx-auto">
      <div className="w-3xl h-full">
        <h1 className="text-2xl font-bold mb-4 text-center mt-2">
          Adicione um novo contato
        </h1>
        <ContactForm />
      </div>
    </main>
  );
}
