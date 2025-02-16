import { Presentation } from "@/lib/editor/types";
import { apiFetch } from "@/lib/fetch";

export interface PresentationResponse {
  id: number;
  userId: number;
  data: Presentation;
  prompts: string[];
}

export async function createWithoutAi(data: Presentation) {
  return await apiFetch<PresentationResponse>(
    "/api/v1/presentation/without-neuron",
    { data: JSON.stringify(data) },
    {
      method: "POST",
    }
  );
}

export async function get(id: number) {
  return await apiFetch<PresentationResponse>(`/api/v1/presentation/${id}`);
}

export async function update(id: number, data: Presentation) {
  return await apiFetch<PresentationResponse>(
    `/api/v1/presentation/${id}`,
    { data: JSON.stringify(data) },
    {
      method: "PATCH",
    }
  );
}
