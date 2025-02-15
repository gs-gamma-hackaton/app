import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { LayoutNode } from "@/lib/editor/node";
import { ContextMenuProps } from "@radix-ui/react-context-menu";
import { Copy, Move, Plus, Trash } from "lucide-react";
import { PropsWithChildren } from "react";
import { performAction } from "../action";

export interface RendererContextMenuProps
  extends ContextMenuProps,
    PropsWithChildren {
  node: LayoutNode<any>;
}

export default function RendererContextMenu({
  node,
  children,
  ...props
}: RendererContextMenuProps) {
  const canMoveUp = node.index > 0;
  const canMoveDown = node.index < node.parent!.children.length - 1;
  const canMoveUpInto =
    canMoveUp && node.parent!.children[node.index - 1].canHaveChildren;
  const canMoveDownInto =
    canMoveDown && node.parent!.children[node.index + 1].canHaveChildren;
  const canMoveOutside = node.depth > 2;

  const hasMoveOption = canMoveUp || canMoveDown;

  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {node.canHaveChildren && (
          <ContextMenuItem onClick={() => performAction(node, "create")}>
            <Plus className="mr-2 size-4" />
            Создать элемент
          </ContextMenuItem>
        )}
        <ContextMenuItem onClick={() => performAction(node, "duplicate")}>
          <Copy className="mr-2 size-4" />
          Дублировать
        </ContextMenuItem>
        {hasMoveOption && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Move className="mr-2 size-4" />
              Переместить
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {canMoveUp && (
                <ContextMenuItem onClick={() => performAction(node, "moveUp")}>
                  Выше
                </ContextMenuItem>
              )}
              {canMoveDown && (
                <ContextMenuItem
                  onClick={() => performAction(node, "moveDown")}
                >
                  Ниже
                </ContextMenuItem>
              )}
              {canMoveUpInto && (
                <ContextMenuItem
                  onClick={() => performAction(node, "moveInsideUp")}
                >
                  В контейнер (вверх)
                </ContextMenuItem>
              )}
              {canMoveDownInto && (
                <ContextMenuItem
                  onClick={() => performAction(node, "moveInsideDown")}
                >
                  В контейнер (вниз)
                </ContextMenuItem>
              )}
              {canMoveOutside && (
                <ContextMenuItem
                  onClick={() => performAction(node, "moveOutside")}
                >
                  Из контейнера
                </ContextMenuItem>
              )}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
        <ContextMenuItem onClick={() => performAction(node, "delete")}>
          <Trash className="mr-2 size-4" />
          Удалить
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
