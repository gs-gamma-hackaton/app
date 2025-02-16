"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createNewPresentation } from "@/lib/slide";
import {
  ExternalLink,
  Import,
  Presentation,
  Sparkles,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <section>
      <h1 className="text-2xl font-bold">Мои презентации</h1>
      <div className="mt-4 grid w-full grid-cols-3 gap-4">
        <button
          className="flex flex-col items-start gap-12 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 p-4 transition animate-in fade-in slide-in-from-top-8 duration-2000 hover:brightness-110"
          onClick={async () => {
            const result = await createNewPresentation();
            router.push(`/editor/${result.id}`);
          }}
        >
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
      <Table className="mt-4 text-gray-500">
        <TableHeader>
          <TableRow>
            <TableHead className="w-16"></TableHead>
            <TableHead>Название презентации</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="group">
            <TableCell>
              <Presentation />
            </TableCell>
            <TableCell className="group-hover:text-gray-300">
              Презентация 1
            </TableCell>
            <TableCell className="flex justify-end gap-2">
              <Button variant={"ghost"} size={"icon"}>
                <ExternalLink />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="group">
            <TableCell>
              <Presentation />
            </TableCell>
            <TableCell className="group-hover:text-gray-300">
              Презентация 1
            </TableCell>
            <TableCell className="flex justify-end gap-2">
              <Button variant={"ghost"} size={"icon"}>
                <ExternalLink />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
