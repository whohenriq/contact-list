"use client";

import { fetchContacts } from "@/actions/fetch-contacts";
import { ContactCard } from "@/components/contact-card";
import { ErrorState } from "@/components/error-state";
import { ContactsLoadingState } from "@/components/loading";
import { useSearch } from "@/components/search/useSearch";
import { Button } from "@/components/ui/button";
import { Contact } from "@/types/contact";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

export function ContactsList() {
  const { debouncedSearch } = useSearch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts", debouncedSearch],
    queryFn: fetchContacts,
  });

  const renderEmptyMessage = () => {
    return (
      <div className="text-center py-12">
        <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          Nenhum contato encontrado!
        </h2>
        <p className="text-muted-foreground mb-6">
          {debouncedSearch
            ? `Nenhum contato corresponde: "${debouncedSearch}"`
            : "Adicione seu primeiro contato para começar"}
        </p>
        {!debouncedSearch && (
          <Button className="h-11 cursor-pointer">Adicionar contato</Button>
        )}
      </div>
    );
  };

  if (error) {
    return <ErrorState />;
  }

  if (isLoading) {
    return <ContactsLoadingState />;
  }

  if (!data || data.length === 0) {
    return <>{renderEmptyMessage()}</>;
  }

  return (
    <div className="grid w-full lg:grid-cols-3 gap-4 p-4 md:grid-cols-2 sm:grid-cols-1">
      {data?.map((contact: Contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
