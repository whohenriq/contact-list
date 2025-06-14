"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useContactForm } from "./useContactForm";
import { Contact } from "@/types/contact";

interface ContactFormProps {
  isEdit?: boolean;
  contact?: Contact;
}

export function ContactForm({ isEdit = false, contact }: ContactFormProps) {
  const { form, onSubmit } = useContactForm({ contact });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 h-fit gap-4"
      >
        <div className="flex flex-col gap-6 h-fit px-6 lg:grid lg:grid-cols-2 lg:px-0 md:px-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Meu Nome" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: (11) 91234-5678" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 h-fit px-6 lg:grid lg:grid-cols-2 lg:px-0 md:px-0">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="example@email.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="px-6 lg:px-0 md:px-0">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rua Exemplo, 123" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center h-full w-full mt-6 px-6 lg:px-0 md:px-0">
          <Button type="button" className="bg-red-600 hover:bg-red-700">
            <Link href="/">{isEdit ? "Voltar" : "Cancelar"}</Link>
          </Button>

          <Button type="submit" variant={"default"}>
            {isEdit ? "Editar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
