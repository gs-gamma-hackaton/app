"use client";

import { useActiveSlide } from "@/components/context/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { menuRegistry, menuRegistryCategories } from "@/lib/editor/registry";
import { MenuRegistryEntry } from "@/lib/editor/types";
import { PropsWithChildren, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

export default function ElementSelect({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const slide = useActiveSlide();

  const categories = useMemo(() => {
    const categories: Record<string, MenuRegistryEntry[]> = {};
    Object.keys(menuRegistryCategories).forEach((k) => (categories[k] = []));
    menuRegistry.forEach((e) => {
      categories[e.category].push(e);
    });
    Object.keys(categories).forEach((key) => {
      if (categories[key].length == 0) delete categories[key];
    });
    return categories;
  }, []);

  const handleClick = (entry: MenuRegistryEntry) => {
    if (!slide) return;
    const node = entry.generator();
    setOpen(false);
    setTimeout(() => node.focus(), 0);
    slide.append(node);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="rounded-xl border-primary bg-background-overlay"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl">Выбор элемента</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full py-4">
          {Object.entries(categories).map((value) => {
            return (
              <div key={value[0]}>
                <h1 className="p-1 text-sm text-muted-foreground">
                  {menuRegistryCategories[value[0]]}
                </h1>
                <ul>
                  {value[1].map((e, i) => (
                    <li key={i}>
                      <Button
                        variant="ghost"
                        className="h-auto w-full justify-start gap-4"
                        onClick={() => handleClick(e)}
                      >
                        <div className="flex size-12 items-center justify-center rounded bg-accent">
                          <e.icon className="scale-[2] text-accent-foreground" />
                        </div>
                        <div className="flex flex-col items-start">
                          <p>{e.title}</p>
                          <p className="text-muted-foreground">
                            {e.description}
                          </p>
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
