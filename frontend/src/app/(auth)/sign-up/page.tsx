import Link from "next/link";
import SignUpForm from "../components/sign-up-form";

export default function Page() {
  return (
    <>
      <h1 className="bg-jshine bg-clip-text text-4xl font-bold text-transparent">
        Регистрация
      </h1>
      <SignUpForm />
      <Link href="/sign-in" className="text-sm text-gray-500 underline">
        Уже есть аккаунт? Войти
      </Link>
    </>
  );
}
