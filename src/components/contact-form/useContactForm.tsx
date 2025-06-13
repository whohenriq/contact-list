"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { addNewContact } from "@/actions/add-contact";
import { useQueryClient } from "@tanstack/react-query";
import { Contact } from "@/types/contact";
import { putContact } from "@/actions/patch-contact";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Deve conter no mínimo 2 caracteres" }),
  phone: z
    .string()
    .min(10, { message: "Deve conter no mínimo 10 caracteres" })
    .max(15, { message: "Deve conter no máximo 15 caracteres" })
    .regex(
      /^(?:\(?\d{2}\)?\s?)?(?:9\d{4}|\d{4})-?\d{4}$/,
      "Telefone inválido. Ex: (11) 91234-5678)"
    ),

  email: z.string().optional(),
  birthday: z.string().optional(),
  address: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactSchema>;

interface UseContactFormProps {
  contact?: Contact;
}

export function useContactForm({ contact }: UseContactFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormSchema>({
    defaultValues: {
      name: contact?.name || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
      address: contact?.address || "",
      birthday: contact?.birthday || "",
    },
    resolver: zodResolver(contactSchema),
  });

  const redirectHomePage = () => {
    router.push("/");
  };

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);

    const payload = {
      ...data,
      email: data.email ?? "",
      birthday: data.birthday ?? "",
      address: data.address ?? "",
    };
    try {
      const response = contact
        ? await putContact({ data: { id: contact.id, ...payload } })
        : await addNewContact({ data: payload });

      if (!response) {
        toast({
          title: contact
            ? "Erro ao atualizar contato!"
            : "Erro ao criar contato!",
          variant: "destructive",
          duration: 2500,
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["contacts"],
        type: "active",
      });

      toast({
        title: contact
          ? "Contato atualizado com sucesso!"
          : "Novo contato criado com sucesso!",
        variant: "success",
        duration: 2500,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      redirectHomePage();
    }
  };

  return {
    form,
    onSubmit,
    setIsSubmitting,
    isSubmitting,
  };
}
