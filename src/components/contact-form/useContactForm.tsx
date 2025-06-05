"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { addNewContact } from "@/actions/add-contact";
import { useQueryClient } from "@tanstack/react-query";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Deve conter no mínimo 2 caracteres" }),
  email: z.string().email("E-mail inválido").optional(),
  phone: z
    .string()
    .regex(
      /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
      "Telefone inválido (ex: +55 11 91234-5678)"
    )
    .optional(),
  address: z.string().optional(),
  birthday: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Data de nascimento deve estar no formato YYYY-MM-DD"
    )
    .optional(),
});

export type ContactFormSchema = z.infer<typeof contactSchema>;

export function useContactForm() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      birthday: "",
    },
    resolver: zodResolver(contactSchema),
  });

  const redirectHomePage = () => {
    router.push("/");
  };

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);
    try {
      const response = await addNewContact({ data });

      if (!response) {
        toast({
          title: "Erro ao criar nova sessão!",
          variant: "destructive",
        });
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
        type: "active",
      });
      toast({
        title: "Novo contato criado com sucesso!",
        variant: "default",
      });
      form.reset();
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
