import { List } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen w-full font-landing">
      <header className="flex w-full items-center justify-between border-b border-primary px-4 py-2">
        <div className="font-bold">Ваш профиль</div>
        <div className="flex items-center gap-2 text-gray-500">
          <img
            src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=Adrian"
            className="size-8 rounded"
          />
          <p>user@example.com</p>
        </div>
      </header>
      <main className="relative grid h-full grid-cols-[250px_1fr]">
        <div className="h-full bg-background-overlay p-4">
          <ul>
            <li className="flex items-center gap-2 rounded bg-background p-2 text-secondary">
              <List />
              Мои презентации
            </li>
          </ul>
        </div>
        <div className="p-4">{children}</div>
      </main>
    </section>
  );
}
