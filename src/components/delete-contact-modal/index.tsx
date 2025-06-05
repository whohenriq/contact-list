"use client";

import type React from "react";

import { Trash2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "@/types/contact";
import { deleteContact } from "@/actions/delete-contact";

interface DeleteContactModal {
  contact: Contact;
  isDialogDeleteOpen: boolean;
  setIsDialogDeleteOpen: (isDialogDeleteOpen: boolean) => void;
}

export function DeleteContactModal({
  contact,
  isDialogDeleteOpen,
  setIsDialogDeleteOpen,
}: DeleteContactModal) {
  const handleDeleteConfirm = async () => {
    setIsDialogDeleteOpen(false);
    await deleteContact({ contactId: contact.id! });
  };

  return (
    <>
      <Dialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirmar exclusão
            </DialogTitle>
            <DialogDescription>
              Deseja deletar o contato {contact.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button
              variant="secondary"
              onClick={() => setIsDialogDeleteOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              <Trash2 className="h-4 w-4" />
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
