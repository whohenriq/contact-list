"use client";

import { fetchContacts } from "@/actions/fetch-contacts";
import { ContactCard } from "@/components/contact-card";
import { ContactCardSkeleton } from "@/components/contact-card/contact-card-skeleton";
import { Contact } from "@/types/contact";
import { useQuery } from "@tanstack/react-query";

export function ContactsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  if (error) {
    return <div>Ocorreu um erro ao carregar os contatos. Tente novamente!</div>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ContactCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4 px-4 md:grid-cols-2 sm:grid-cols-1">
      {data?.map((contact: Contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
