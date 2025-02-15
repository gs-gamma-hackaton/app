import Link from "next/link";
import SignInForm from "../components/sign-in-form";

export default function Page() {
  return (
    <>
      <h1 className="bg-jshine bg-clip-text text-4xl font-bold text-transparent">
        Вход на платформу
      </h1>
      <SignInForm />
      <Link href="/sign-up" className="text-sm text-gray-500 underline">
        Создать аккаунт
      </Link>
    </>
  );
}
