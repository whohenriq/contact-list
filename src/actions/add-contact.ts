"use server";

import { API_HOST } from "./const";
import { Contact } from "@/types/contact";

type CreateContactProps = Omit<Contact, "id" | "createdAt" | "updatedAt">;

export async function addNewContact({ data }: { data: CreateContactProps }) {
  try {
    const body = data;
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const fetchOptions: RequestInit = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    };

    const url = new URL(`${API_HOST}/contacts`);

    const response = await fetch(url.href, fetchOptions);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    throw new Error(
      `Failed to add contact: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
