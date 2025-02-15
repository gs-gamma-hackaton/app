"use client";

import * as Card from "@/components/ui/card";
import * as Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";
import signUpForm, { SignUpData } from "@/lib/forms/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";
import { useForm, useFormContext } from "react-hook-form";

export default function SignUpForm() {
  return (
    <Card.Card className="w-full sm:w-auto sm:min-w-96">
      <Card.CardHeader className="sr-only">
        <Card.CardTitle>Авторизация</Card.CardTitle>
      </Card.CardHeader>
      <SignUpFormProvider>
        <Card.CardContent className="mt-4">
          <SignUpFormContent />
        </Card.CardContent>
        <Card.CardFooter>
          <SignUpButton />
        </Card.CardFooter>
      </SignUpFormProvider>
    </Card.Card>
  );
}

function SignUpFormProvider({
  children,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: SignUpData) => {
    const [ok, errorMessage] = [false, "err"]; //await SignUp(data);
    const message = ok ? "Добро пожаловать!" : errorMessage!;
    toast({ title: message });

    if (ok) router.push("/");
  };

  return (
    <Form.Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} {...props}>
        {children}
      </form>
    </Form.Form>
  );
}

function SignUpFormContent() {
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

function SignUpButton() {
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
