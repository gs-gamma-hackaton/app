import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function RenameDialog({
  initial,
  onValueChange,
}: {
  initial: string;
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Переименование презентации</DialogTitle>
          <DialogDescription>
            Выберите новое имя для презентации
          </DialogDescription>
        </DialogHeader>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Отмена</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={() => onValueChange?.(value)}>Продолжить</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
