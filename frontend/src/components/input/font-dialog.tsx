"use client";

import { getAll } from "@/api/fonts";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Frown, LoaderCircle } from "lucide-react";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useGoogleFonts } from "../context/fonts";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export interface FontDialogProps extends PropsWithChildren {
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

export default function FontDialog({
  children,
  initialValue,
  onValueChange,
}: FontDialogProps) {
  const { addFont, removeFont } = useGoogleFonts();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const { data: fonts, isLoading } = useQuery({
    queryKey: ["fonts"],
    queryFn: getAll,
  });

  useEffect(() => {
    if (open) {
      setValue(initialValue ?? "Open Sans");
      setSearch(initialValue ?? "Open Sans");
    }
  }, [open]);

  const items = useMemo(() => {
    if (!fonts) return [];
    const filtered = fonts.items.filter((item) =>
      item.family.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.map((item) => ({
      label: item.family,
      value: item.family,
    }));
  }, [fonts, search]);

  const selectFont = (font: string) => {
    removeFont(value);
    setValue(font);
    setSearch(font);
    addFont(font);
  };
  const confirmSelectFont = () => {
    onValueChange?.(value);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выбор шрифта</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p
            className="rounded bg-muted p-2 text-lg"
            style={{
              fontFamily: value,
            }}
          >
            Это пример текста со шрифтом{" "}
            <span className="whitespace-pre">"{value}"</span>
          </p>
          <Input
            placeholder="Поиск шрифта"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ScrollArea className="h-56 rounded bg-muted">
            <ul className="divide-y divide-muted text-muted-foreground">
              {items.map((item, index) => (
                <li key={index}>
                  <button
                    className={cn(
                      "w-full px-2 py-1 text-start hover:bg-primary focus:bg-primary",
                      item.value == value && "!bg-white/30"
                    )}
                    onClick={() => selectFont(item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            {items.length == 0 && (
              <div className="flex w-full flex-col items-center justify-center gap-2 p-4 text-white/50">
                {isLoading ? (
                  <>
                    <LoaderCircle className="size-16 animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  <>
                    <Frown className="size-16" />
                    Шрифты не найдены
                  </>
                )}
              </div>
            )}
          </ScrollArea>
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-400"
              onClick={() => confirmSelectFont()}
            >
              Сохранить выбор
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
