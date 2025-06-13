"use client";

import { useState } from "react";
import type React from "react";

import { useRouter } from "next/navigation";
import type { Contact } from "@/types/contact";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MoreVertical, Trash2, SquarePen } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteContactModal } from "../delete-contact-modal";

interface ContactProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactProps) {
  const router = useRouter();
  const [isDialogDeleteOpen, setisDialogDeleteOpen] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/contact/edit/${contact.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setisDialogDeleteOpen(true);
  };

  return (
    <>
      <Card
        key={contact.id}
        className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
      >
        <CardContent
          className="flex items-start justify-between gap-4 px-4"
          // onClick={() => router.push(`/contacts/${contact.id}`)}
        >
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{contact.name}</h3>

              <div className="mt-2">
                {contact.email && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Abrir opções</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                <SquarePen className="mr-2 h-4 w-4" />
                <span>Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteClick}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Deletar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <DeleteContactModal
        contact={contact}
        isDialogDeleteOpen={isDialogDeleteOpen}
        setIsDialogDeleteOpen={setisDialogDeleteOpen}
      />
    </>
  );
}
