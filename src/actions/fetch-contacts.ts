"use server";

import { fetcher } from "@/lib/utils";
import { API_HOST } from "./const";
import { Contact } from "@/types/contact";

export async function fetchContacts(): Promise<Contact[]> {
  try {
    const response = await fetcher(`${API_HOST}/contacts`);
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}
