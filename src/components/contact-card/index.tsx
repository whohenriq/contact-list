"use client";

import { useRouter } from "next/navigation";
import { Contact } from "@/types/contact";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Mail, Phone } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Trash2, SquarePen } from "lucide-react";
import { Button } from "../ui/button";

interface ContactProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactProps) {
  const router = useRouter();

  return (
    <Card
      key={contact.id}
      className="overflow-hidden group hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <CardContent
        className="p-0"
        onClick={() => router.push(`/contacts/${contact.id}`)}
      >
        <div className="flex items-start justify-between gap-4 p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{contact.name}</h3>

              <div className="mt-2 space-y-1">
                {contact.email && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="flex w-fit items-center mt-4 gap-4">
        <Button
          variant="secondary"
          size="sm"
          className="cursor-pointer"
          onClick={() => router.push(`/contact/edit/${contact.id}`)}
        >
          <SquarePen />
          Editar
        </Button>
        <Button variant="destructive" size="sm" className="cursor-pointer">
          <Trash2 />
          Deletar
        </Button>
      </div>
    </Card>
  );
}
