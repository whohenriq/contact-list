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

    const response = await fetch(url.href, fetchOptions);

    return response;
  } catch (error) {
    console.error(error);
  }
}
