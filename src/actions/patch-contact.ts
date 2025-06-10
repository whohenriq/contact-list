"use server";

import { API_HOST } from "./const";
import { Contact } from "@/types/contact";

export interface putContactProps
  extends Omit<Contact, "createdAt" | "updatedAt"> {
  id: Contact["id"];
}

export async function putContact({ data }: { data: putContactProps }) {
  try {
    const { id, ...body } = data;

    const headers: HeadersInit = { "Content-Type": "application/json" };
    const fetchOptions: RequestInit = {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    };

    const url = new URL(`${API_HOST}/contacts/${id}`);

    const response = await fetch(url.href, fetchOptions);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    throw new Error(
      `Failed to update contact: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
