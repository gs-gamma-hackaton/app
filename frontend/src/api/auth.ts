import { apiFetch } from "@/lib/fetch";
// import { RegisterData } from "@/lib/forms/register";
import { SignInData } from "@/lib/forms/sign-in";
import { SignUpData } from "@/lib/forms/sign-up";
// import { User } from "./user";

export type AuthCredentials = SignInData;

export interface AuthResult {
  access_token: string;
}
// export type { User };

export async function auth(credentials: AuthCredentials) {
  return await apiFetch<AuthResult>("/api/v1/auth/login", credentials, {
    method: "POST",
  });
}

export async function logout() {
  // await apiFetch("/api/auth/logout");
}

// export async function me() {
//   return await apiFetch<User>("/api/auth/profile");
// }

export async function register(data: SignUpData) {
  return await apiFetch<void>("/api/v1/auth/register", data, {
    method: "POST",
  });
}
