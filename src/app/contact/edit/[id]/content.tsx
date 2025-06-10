"use client";

import { fetchContactDetail } from "@/actions/fetch-contact-detail";
import { ContactForm } from "@/components/contact-form";
import { Spinner } from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";

interface ContentProps {
  contactId: number;
}

export function Content({ contactId }: ContentProps) {
  const {
    data: contactDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contacts", contactId],
    queryFn: () => fetchContactDetail({ contactId }),
    enabled: !!contactId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner size="lg" className="border-foreground" />
      </div>
    );
  }

  if (error) {
    return <h1>Nenhum contato encontrado</h1>;
  }

  return (
    <main className="flex items-center justify-center h-full w-full mx-auto">
      <div className="w-3xl h-full">
        <h1 className="text-2xl font-bold mb-4">Editar um contato</h1>
        <ContactForm isEdit contact={contactDetail!} />
      </div>
    </main>
  );
}
