"use client";

import Link from "next/link";
import { fetchContacts } from "@/actions/fetch-contacts";
import { ContactCard } from "@/components/contact-card";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { Contact } from "@/types/contact";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { useCallback } from "react";
import { Spinner } from "@/components/spinner";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

export function ContactsList() {
  const { debouncedSearch } = useSearch();
  const [scope] = useAnimate();

  const {
    data: contacts,
    isLoading: isContactLoading,
    error,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  const handleFilterBySearch = useCallback(
    (contacts: Contact[], search: string) => {
      const lowerSearch = search.toLowerCase();

      return search
        ? contacts.filter((contact) =>
            [contact.name, contact.email, contact.phone].some(
              (field) => field && field.toLowerCase().includes(lowerSearch)
            )
          )
        : contacts;
    },
    []
  );

  const filteredContacts = handleFilterBySearch(
    contacts ?? [],
    debouncedSearch
  );

  const renderEmptyMessage = () => {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2">
            Nenhum contato encontrado!
          </h2>
          <p className="text-muted-foreground mb-6">
            {debouncedSearch
              ? `Nenhum contato corresponde: "${debouncedSearch}"`
              : "Adicione seu primeiro contato para começar"}
          </p>
          {!debouncedSearch && (
            <Button className="h-11 cursor-pointer" asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={"/contact/add"}>Adicionar contato</Link>
              </motion.div>
            </Button>
          )}
        </motion.div>
      </div>
    );
  };

  if (error) {
    return <ErrorState />;
  }

  if (isContactLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!filteredContacts || filteredContacts.length === 0) {
    return <>{renderEmptyMessage()}</>;
  }

  return (
    <div ref={scope} className="w-full h-full">
      <AnimatePresence>
        {!filteredContacts || filteredContacts.length === 0 ? (
          renderEmptyMessage()
        ) : (
          <motion.div
            className="grid w-full lg:grid-cols-3 gap-4 p-4 md:grid-cols-2 sm:grid-cols-1"
            initial={false}
            animate={{
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            }}
          >
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.05,
                  },
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                layout
              >
                <ContactCard contact={contact} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
