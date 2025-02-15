import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid h-screen grid-cols-[300px_1fr]">
      <img src="/signin.jpg" className="h-full w-full object-cover" />
      <div className="relative flex h-full w-full flex-col justify-center gap-6 p-8">
        {children}
        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-fuchsia-700">
          <Link href={"/"}>
            <BrainCircuit className="size-10" />
          </Link>
        </div>
      </div>
    </section>
  );
}
