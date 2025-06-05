"use client";

import { fetchContactDetail } from "@/actions/fetch-contact-detail";
import { ContactCardSkeleton } from "@/components/contact-card/contact-card-skeleton";
import { ContactForm } from "@/components/contact-form";
import { useQuery } from "@tanstack/react-query";
import { isError } from "lodash-es";
import { useState } from "react";

interface ContentProps {
  contactId: number;
}

export function Content({ contactId }: ContentProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data : contactDetail, isLoading, error } = useQuery({
    queryKey: ["contacts", contactId],
    queryFn: () => fetchContactDetail({ contactId }),
    enabled: !!contactId,
  });

  if (isLoading) {
    return <ContactCardSkeleton />;
  }

  if (error) {
    return <h1>Nenhum contato encontrado</h1>;
  }

  return (
    <main className="flex items-center justify-center h-full w-full mx-auto">
      <div className="w-3xl h-full">
        <h1 className="text-2xl font-bold mb-4">Editar um contato</h1>
        <ContactForm isEdit={isEditing} contact={contactDetail!} />
      </div>
    </main>
  );
}
