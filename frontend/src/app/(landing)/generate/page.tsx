import { Import, Sparkles, User } from "lucide-react";
import PromptForm from "./components/prompt-form";

export default function Page() {
  return (
    <div className="flex flex-col items-center px-16 py-24 font-landing">
      <div className="space-y-2 text-center">
        <h1 className="bg-jshine bg-clip-text text-4xl font-bold text-transparent animate-in fade-in slide-in-from-top-8 duration-2000">
          Преврати идею в контент уже сейчас
        </h1>
        <h2 className="text-2xl text-gray-500 duration-1000 animate-in fade-in slide-in-from-top-8">
          От концепта до презентации - 1 шаг
        </h2>
      </div>
      <PromptForm />
      <div className="flex w-full items-center justify-center gap-2 text-gray-500">
        <div className="h-0.5 flex-grow rounded bg-primary"></div>
        <p>или</p>
        <div className="h-0.5 flex-grow bg-primary"></div>
      </div>
      <div className="mt-4 grid w-full grid-cols-3 gap-4">
        <button className="flex flex-col items-start gap-12 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 p-4 transition animate-in fade-in slide-in-from-top-8 duration-2000 hover:brightness-110">
          <div className="w-min rounded bg-black/15 p-2">
            <Sparkles />
          </div>
          <div className="space-y-2 text-left">
            <h1 className="text-xl font-bold text-white">
              Начать с чистого листа
            </h1>
            <p>Создавайте свою презентацию с нуля</p>
          </div>
        </button>
        <button className="flex flex-col items-start gap-12 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-4 transition animate-in fade-in slide-in-from-top-8 duration-2000 hover:brightness-110">
          <div className="w-min rounded bg-black/15 p-2">
            <User />
          </div>
          <div className="space-y-2 text-left">
            <h1 className="text-xl font-bold text-white">
              Войти в личный кабинет
            </h1>
            <p>Вернитесь к тому, что Вы уже создали</p>
          </div>
        </button>
        <button className="flex flex-col items-start gap-12 rounded-lg bg-gradient-to-tr from-pink-500 to-red-500 p-4 transition animate-in fade-in slide-in-from-top-8 duration-2000 hover:brightness-110">
          <div className="w-min rounded bg-black/15 p-2">
            <Import />
          </div>
          <div className="space-y-2 text-left">
            <h1 className="text-xl font-bold text-white">Импорт</h1>
            <p>Превратите любой документ в презентацию</p>
          </div>
        </button>
      </div>
    </div>
  );
}
