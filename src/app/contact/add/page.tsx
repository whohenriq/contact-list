import { ContactForm } from "@/components/form";

export default function AddContactPage() {
  return (
    <div className="container p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Adicione um novo contato: </h1>
        <ContactForm />
      </div>
    </div>
  );
}
