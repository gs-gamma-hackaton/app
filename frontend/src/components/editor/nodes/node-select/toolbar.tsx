import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useEventEmitter from "@/hooks/use-event";
import useNodeWithSnapshots from "@/hooks/use-node-with-snapshots";
import { menuRegistry, menuRegistryCategories } from "@/lib/editor/registry";
import {
  LayoutNodeToolbarComponent,
  MenuRegistryEntry,
} from "@/lib/editor/types";
import { useMemo } from "react";
import { NodeSelectAttributes } from ".";

export const NodeSelectSearchEvent = "nodeSelectSearch";

const NodeSelectNodeToolbar: LayoutNodeToolbarComponent<
  NodeSelectAttributes
> = ({ node }) => {
  const { eventData: search } = useEventEmitter<string>(NodeSelectSearchEvent);
  const parent = useNodeWithSnapshots(node.parent!);

  const categories = useMemo(() => {
    const categories: Record<string, MenuRegistryEntry[]> = {};
    Object.keys(menuRegistryCategories).forEach((k) => (categories[k] = []));
    if (search && search.length > 0) {
      return {
        search: menuRegistry.filter((e) =>
          e.title.toLowerCase().includes(search.toLowerCase())
        ),
      };
    }
    menuRegistry.forEach((e) => {
      categories[e.category].push(e);
    });
    Object.keys(categories).forEach((key) => {
      if (categories[key].length == 0) delete categories[key];
    });
    return categories;
  }, [search]);

  const handleClick = (generator: MenuRegistryEntry["generator"]) => {
    const created = generator();
    setTimeout(() => created.focus(), 0);
    parent.insert(node.index, created);
    node.removeSelf();
  };

  return (
    <ScrollArea className="h-64 min-w-80">
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
                    onClick={() => handleClick(e.generator)}
                  >
                    <div className="flex size-12 items-center justify-center rounded bg-accent">
                      <e.icon className="scale-[2] text-accent-foreground" />
                    </div>
                    <div className="flex flex-col items-start">
                      <p>{e.title}</p>
                      <p className="text-muted-foreground">{e.description}</p>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default NodeSelectNodeToolbar;
