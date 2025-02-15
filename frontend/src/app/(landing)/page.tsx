import { Button } from "@/components/ui/button";
import { BrainCircuit, Send } from "lucide-react";

export default function Page() {
  return (
    <div className="font-landing flex flex-col">
      <section className="flex min-h-[85vh] w-full flex-col items-center justify-center bg-[url(/images/promo.png)] bg-cover py-8 tracking-wider">
        <div className="max-w-[80%] space-y-6 text-center">
          <BrainCircuit className="inline-block size-16 text-fuchsia-700 duration-1000 animate-in fade-in-20 slide-in-from-top-8" />
          <h1 className="bg-jshine bg-clip-text text-5xl font-bold text-transparent duration-1000 animate-in fade-in-20 slide-in-from-top-8">
            Создавайте и впечатляйте легко.
          </h1>
          <h2 className="text-4xl font-medium text-gray-300 duration-1000 animate-in fade-in slide-in-from-top-8">
            Превратите идеи в мощные и убедительные слайды с помощью
            искусственного интеллекта.
          </h2>
          <p className="duration-2000 text-xl text-gray-500 animate-in fade-in">
            Впечатляющие презентации за минуты. Никакого дизайна и кода – ваш
            контент в центре внимания!
          </p>
          <div className="duration-2000 relative w-full py-4 animate-in fade-in slide-in-from-left-8">
            <input
              className="h-16 w-full rounded bg-primary px-8 py-4"
              placeholder="Создай стильную презентацию про технологии с краткими и понятными слайдами"
            />
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 size-12 -translate-y-1/2 bg-primary"
            >
              <Send />
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-jshine relative flex w-full flex-col items-center justify-center py-8 lg:bg-none">
        <div className="lg:bg-jshine flex w-[80%] flex-col items-center rounded px-4 py-8 lg:pb-16">
          <h1 className="text-center text-2xl font-bold">
            Воплощаем идеи в жизнь. Мгновенно.
          </h1>
        </div>
        <div className="grid w-[80%] grid-cols-1 gap-4 px-4 lg:-translate-y-10 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded bg-primary px-8 py-6 text-center duration-1000 animate-in fade-in">
            <h2 className="text-xl font-bold">Ваш контент с нашим дизайном</h2>
            <p className="text-gray-300">
              Сосредоточьтесь на содержимом. Красивый результат без каких-либо
              дизайнерских работ.
            </p>
            <img className="size-64 pt-5" src="/images/innovation-1.svg" />
          </div>
          <div className="flex flex-col items-center gap-4 rounded bg-primary px-8 py-6 text-center duration-1000 animate-in fade-in">
            <h2 className="text-xl font-bold">Это просто, быстро и весело</h2>
            <p className="text-gray-300">
              Мгновенно превращайте любую идею в презентацию. Просто наберите
              текст и получите впечатляющий результат.
            </p>
            <img className="size-64 pt-5" src="/images/innovation-2.svg" />
          </div>
          <div className="flex flex-col items-center gap-4 rounded bg-primary px-8 py-6 text-center duration-1000 animate-in fade-in">
            <h2 className="text-xl font-bold">Универсальный инструмент</h2>
            <p className="text-gray-300">
              Множество шаблонов для любых целей: деловые презентации,
              образовательные материалы и многое другое.
            </p>
            <img className="size-64 pt-5" src="/images/innovation-3.svg" />
          </div>
        </div>
      </section>
    </div>
  );
}
