"use client";

import { list, remove } from "@/api/presentation";
import { Button } from "@/components/ui/button";
import Confirm from "@/components/ui/confirm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createNewPresentation } from "@/lib/slide";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ExternalLink,
  Import,
  Presentation,
  Sparkles,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const client = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["presentations"],
    queryFn: list,
  });

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
          {data?.map((item) => (
            <TableRow className="group" key={item.id}>
              <TableCell>
                <Presentation />
              </TableCell>
              <TableCell className="group-hover:text-gray-300">
                {item.data.name}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button variant={"ghost"} size={"icon"} asChild>
                  <Link href={`/editor/${item.id}`} prefetch={false}>
                    <ExternalLink />
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => setOpen(true)}
                >
                  <Trash />
                </Button>
                <Confirm
                  open={open}
                  onOpenChange={setOpen}
                  onConfirm={async () => {
                    await remove(item.id);
                    client.invalidateQueries({ queryKey: ["presentations"] });
                  }}
                >
                  Вы действительно хотите удалить презентацию? Это действие
                  необратимо!
                </Confirm>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
