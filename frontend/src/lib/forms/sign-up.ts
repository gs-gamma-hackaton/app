import { z } from "zod";

const username = z.string().min(2, "Имя должно быть не менее, чем 2 символа");
const email = z.string().email();
const password = z
  .string()
  .min(4, "Пароль должен быть длиной не менее 4 символов");
const passwordConfirm = z.string();

const signUpForm = z
  .object({
    username,
    email,
    password,
    passwordConfirm,
  })
  .refine((data) => data.password == data.passwordConfirm, {
    message: "Пароли должны совпадать",
    path: ["passwordConfirm"],
  });

export type SignUpData = z.infer<typeof signUpForm>;
export default signUpForm;
