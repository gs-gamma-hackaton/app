"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Hint } from "@/components/ui/hint";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Dialog } from "@radix-ui/react-dialog";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PromptForm() {
  const params = useSearchParams();
  const [prompt, setPrompt] = useState(params.get("search") || "");
  const [file, setFile] = useState<File | null>(null);
  const [slidesNumber, setSlidesNumber] = useState("10");

  const [failDialog, setFailDialogOpen] = useState(false);

  const handleSend = (e: any) => {
    e.preventDefault();
    console.log(file);
    setFailDialogOpen(true);
  };

  return (
    <form className="w-full" onSubmit={handleSend}>
      <Dialog open={failDialog} onOpenChange={setFailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Упс!</DialogTitle>
          </DialogHeader>
          <p>
            Функционал ИИ-редактора разработан, но не был интегрирован на
            платформу
          </p>
          <p>Простое создание презентации с чистого листа все еще работает!</p>
          <DialogClose>
            <Button variant={"secondary"}>Погрустить и закрыть</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between gap-2 text-sm text-gray-300">
        <div className="space-x-2">
          <span>Напиши идею для своей презентации</span>
          <Hint text="Введите, что хотите видеть в презентации — от пары слов до детальных инструкций. Наш ИИ создаст для вас структуру слайдов."></Hint>
        </div>
        <Select
          value={slidesNumber}
          onValueChange={(e) => setSlidesNumber(e)}
          disabled
        >
          <SelectTrigger className="w-min">
            <p className="px-2">
              <span className="font-bold">Количество слайдов:</span>{" "}
              {slidesNumber}
            </p>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">1 слайд</SelectItem>
              <SelectItem value="2">2 слайда</SelectItem>
              <SelectItem value="3">3 слайда</SelectItem>
              <SelectItem value="4">4 слайда</SelectItem>
              <SelectItem value="5">5 слайдов</SelectItem>
              <SelectItem value="10">10 слайдов</SelectItem>
              <SelectItem value="15">15 слайдов</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="relative w-full py-2 animate-in fade-in slide-in-from-left-8 duration-2000">
        <input
          className="h-16 w-full rounded bg-primary px-8 py-4"
          placeholder="Создай стильную презентацию про технологии с краткими и понятными слайдами"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="-mt-2 w-full px-4 animate-in fade-in slide-in-from-left-8 duration-2000">
        <div className="rounded-b bg-primary/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Дополнительное содержимое (опционально):
            </span>
            <div className="flex flex-col items-end justify-center gap-2">
              <Input
                type="file"
                className="w-min bg-secondary text-secondary-foreground"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <a href="#" className="text-sm text-gray-500 underline">
                Пример файла
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center p-4">
        <Button variant="ghost" className="h-auto bg-blue-500 px-8 py-4">
          <Send />
          Сгенерировать
        </Button>
      </div>
    </form>
  );
}
