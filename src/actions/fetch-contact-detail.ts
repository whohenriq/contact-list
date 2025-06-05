"use server";

import { fetcher } from "@/lib/utils";
import { API_HOST } from "./const";
import { Contact } from "@/types/contact";

interface FetchContactDetail {
  contactId: number;
}

export async function fetchContactDetail({
  contactId,
}: FetchContactDetail): Promise<Contact | null> {
  try {
    const response = await fetcher(`${API_HOST}/contacts/${contactId}`);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
