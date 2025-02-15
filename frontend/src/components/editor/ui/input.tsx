import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import useNodeWithSnapshots from "@/hooks/use-node-with-snapshots";
import { LayoutNode } from "@/lib/editor/node";
import { cn } from "@/lib/utils";
import { SliderProps } from "@radix-ui/react-slider";
import { LucideIcon } from "lucide-react";
import { StyleRegistry } from "../util/types";

interface StyleSliderProps<T> extends SliderProps {
  node: LayoutNode<T>;
  field: keyof T;
  icon: LucideIcon;
}

export function StyleSelect<T>({
  node,
  field,
  registry,
  defaultValue,
}: {
  node: LayoutNode<T>;
  field: keyof T;
  registry: StyleRegistry;
  defaultValue?: string;
}) {
  const sNode = useNodeWithSnapshots(node);
  const handleChange = (value: any) => {
    sNode.setAttribute(field, value);
  };
  const value = sNode.attributes[field]?.toString() ?? defaultValue;

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(registry).map(([key, value]) => (
          <SelectItem value={key} style={value.selectStyle} key={key}>
            {value.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function StyleToggle<T>({
  node,
  field,
  icon: Icon,
}: {
  node: LayoutNode<T>;
  field: keyof T;
  icon: LucideIcon;
}) {
  const sNode = useNodeWithSnapshots(node);
  return (
    <Toggle
      pressed={!!(sNode.attributes[field] ?? false)}
      onPressedChange={(value) => sNode.setAttribute(field, value)}
    >
      <Icon className="size-4" />
    </Toggle>
  );
}

export function StyleButton<T>({
  node,
  field,
  icon: Icon,
  value,
  isDefault,
  title,
}: {
  node: LayoutNode<T>;
  field: keyof T;
  icon: LucideIcon;
  value?: T[keyof T];
  isDefault?: boolean;
  title?: string;
}) {
  const sNode = useNodeWithSnapshots(node);
  const isActive =
    sNode.attributes[field] == value ||
    (sNode.attributes[field] == undefined && isDefault == true);
  return (
    <Button
      className={cn(
        "size-9 active:bg-muted active:text-muted-foreground",
        isActive && "bg-accent text-accent-foreground"
      )}
      variant="ghost"
      onClick={(e) => sNode.setAttribute(field, value)}
      title={title}
    >
      <Icon className="size-4" />
    </Button>
  );
}

export function StyleSlider<T>({
  node,
  field,
  icon: Icon,
  title,
  ...props
}: StyleSliderProps<T>) {
  const sNode = useNodeWithSnapshots(node);
  return (
    <div className="flex grow items-center gap-4 p-2" title={title}>
      <Icon className="size-4" />
      <Slider
        defaultValue={[+sNode.attributes[field]]}
        step={1}
        className="w-16"
        onValueChange={(value) => sNode.setAttribute(field, value[0])}
        {...props}
      />
    </div>
  );
}

export function StyleDivider() {
  return <div className="mx-1 w-0.5 rounded bg-primary"></div>;
}
