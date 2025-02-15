"use client";

import { AuthCredentials } from "@/api/auth";
import * as Card from "@/components/ui/card";
import * as Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import signInForm, { SignInData } from "@/lib/forms/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { signIn } from "../actions/sign-in";

export default function SignInForm() {
  return (
    <Card.Card className="w-full sm:w-auto sm:min-w-96">
      <Card.CardHeader className="sr-only">
        <Card.CardTitle>Авторизация</Card.CardTitle>
      </Card.CardHeader>
      <SignInFormProvider>
        <Card.CardContent className="mt-4">
          <SignInFormContent />
        </Card.CardContent>
        <Card.CardFooter>
          <SignInButton />
        </Card.CardFooter>
      </SignInFormProvider>
    </Card.Card>
  );
}

function SignInFormProvider({
  children,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  const form = useForm<SignInData>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: AuthCredentials) => {
    const [ok, errorMessage] = await signIn(data);
    const message = ok ? "Добро пожаловать!" : errorMessage!;
    toast({ title: message });

    if (ok) router.push("/profile");
  };

  return (
    <Form.Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} {...props}>
        {children}
      </form>
    </Form.Form>
  );
}

function SignInFormContent() {
  const form = useFormContext();

  return (
    <div className="space-y-2 text-gray-300">
      <Form.FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel>Логин</Form.FormLabel>
            <Form.FormControl>
              <Input placeholder="admin@admin.ru" {...field} />
            </Form.FormControl>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />
      <Form.FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel>Пароль</Form.FormLabel>
            <Form.FormControl>
              <Input type="password" placeholder="●●●●●●●●" {...field} />
            </Form.FormControl>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />
    </div>
  );
}

function SignInButton() {
  const { formState } = useFormContext();
  return (
    <LoadingButton
      className="w-full bg-blue-500 py-6 transition hover:bg-blue-400"
      type="submit"
      loading={formState.isSubmitting}
    >
      Вход
    </LoadingButton>
  );
}
