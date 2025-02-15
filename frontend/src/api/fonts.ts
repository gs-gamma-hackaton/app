import { apiFetch } from "@/lib/fetch";

export interface FontEntry {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: string;
  kind: string;
  menu: string;
}

export interface GetAllResponse {
  kind: string;
  items: FontEntry[];
}

export const getAll = async (): Promise<GetAllResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const url = `/webfonts/v1/webfonts?key=${apiKey}&sort=alpha&subset=cyrillic`;
  return await apiFetch<GetAllResponse>(
    url,
    undefined,
    {},
    "https://www.googleapis.com"
  );
};
