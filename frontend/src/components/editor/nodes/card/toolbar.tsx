import { LayoutNodeToolbarComponent } from "@/lib/editor/types";
import { ListOrdered } from "lucide-react";
import { CardAttributes } from ".";
import { StyleDivider, StyleSelect, StyleToggle } from "../../ui/input";
import { cardSimpleColorRegistry, cardTypeRegistry } from "./util";

const CardNodeSimpleToolbar: LayoutNodeToolbarComponent<CardAttributes> = ({
  node,
}) => {
  return (
    <>
      <StyleSelect
        node={node}
        field="color"
        registry={cardSimpleColorRegistry}
        defaultValue="blue"
      />
    </>
  );
};

const CardNodeBulletToolbar: LayoutNodeToolbarComponent<CardAttributes> = ({
  node,
}) => {
  return (
    <>
      <StyleToggle node={node} field="ordered" icon={ListOrdered} />
    </>
  );
};

const CardNodeToolbar: LayoutNodeToolbarComponent<CardAttributes> = ({
  node,
}) => {
  let Toolbar: any = null;

  if (node.attributes.type == "simple") {
    Toolbar = CardNodeSimpleToolbar;
  } else if (node.attributes.type == "bullet") {
    Toolbar = CardNodeBulletToolbar;
  }

  return (
    <>
      <StyleSelect
        node={node}
        field="type"
        registry={cardTypeRegistry}
        defaultValue="simple"
      />
      <StyleDivider />
      {Toolbar && <Toolbar node={node} />}
    </>
  );
};

export default CardNodeToolbar;
