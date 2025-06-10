"use server";

import { API_HOST } from "./const";

export interface DeleteContactProps {
  contactId: string;
}

export async function deleteContact({ contactId }: DeleteContactProps) {
  try {
    const fetchOptions: RequestInit = {
      method: "DELETE",
    };

    const url = new URL(`${API_HOST}/contacts/${contactId}`);

    await fetch(url.href, fetchOptions);
  } catch (error) {
    console.error(error);
  }
}
