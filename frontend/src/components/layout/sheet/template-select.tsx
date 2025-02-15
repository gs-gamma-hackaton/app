"use client";

import { useActiveSlide, useGlobalStore } from "@/components/context/store";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { wrapNodeWithSnapshots } from "@/hooks/use-node-with-snapshots";
import { LayoutNode } from "@/lib/editor/node";
import { registry, SlideTemplateEntry } from "@/lib/editor/templates";
import { Dialog } from "@radix-ui/react-dialog";
import { PropsWithChildren, useState } from "react";

export default function TemplateSelect({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const slide = useActiveSlide();
  const push = useGlobalStore((state) => state.push);

  const handleClick = (entry: SlideTemplateEntry) => {
    if (!slide) return;

    const parent = wrapNodeWithSnapshots(slide.parent!, push);

    const slideData = entry.root;
    const slideNew = LayoutNode.from(slideData);
    parent.insert(slide.index + 1, slideNew);
    setTimeout(() => slideNew.focus(), 0);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Шаблоны слайдов</DialogTitle>
          <DialogDescription>
            Выберите готовый шаблон под вашу идею
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full py-4">
          <ul className="grid grid-cols-3 gap-4">
            {registry.map((entry, i) => (
              <li key={i}>
                <button
                  className="flex w-full flex-col items-center justify-center gap-2 rounded bg-primary p-2 hover:bg-background-overlay"
                  onClick={() => handleClick(entry)}
                >
                  <img src={entry.image} />
                  {entry.name}
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
