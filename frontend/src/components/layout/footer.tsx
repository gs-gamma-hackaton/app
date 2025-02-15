import { useEvent } from "@/hooks/use-event";
import { NodeHotkeys } from "@/lib/editor/types";
import { HTMLAttributes, useMemo } from "react";
import { ExtendedKeyMapOptions } from "react-hotkeys";

type EventKeyMap = {
  [key: string]: ExtendedKeyMapOptions;
};

export default function Footer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const version = process.env.NEXT_PUBLIC_VERSION;
  // const version = publicRuntimeConfig?.version;

  const eventData = useEvent<NodeHotkeys | null>("nodeKeymap", null);
  const keys = useMemo(() => {
    if (!eventData?.keymap) return [];
    return Object.values(eventData.keymap as EventKeyMap)
      .filter((v) => !!v.name)
      .map(({ name, description }) => ({ name, description }));
  }, [eventData]);

  return (
    <footer className="fixed bottom-0 left-0 z-20 flex !h-8 w-full items-center justify-between gap-2 border-t border-primary bg-background-overlay px-4">
      <div className="flex items-center gap-2 align-middle">
        {keys.map((k, i) => (
          <div key={i} className="space-x-2 text-xs">
            <span className="rounded bg-muted p-0.5 tracking-widest text-muted-foreground">
              {k.description}
            </span>
            <span>{k.name}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">Версия: {version}</div>
    </footer>
  );
}
