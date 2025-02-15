import { LayoutNodeToolbarComponent } from "@/lib/editor/types";
import {
  AlignCenter,
  AlignCenterHorizontal,
  AlignEndHorizontal,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignStartHorizontal,
} from "lucide-react";
import { FlexAttributes } from ".";
import { StyleButton, StyleDivider } from "../../ui/input";

const FlexNodeHorizontalToolbar: LayoutNodeToolbarComponent<FlexAttributes> = ({
  node,
}) => {
  return (
    <>
      <StyleButton
        node={node}
        field="justify"
        value="start"
        icon={AlignLeft}
        isDefault
        title="Выравнивание слева"
      />
      <StyleButton
        node={node}
        field="justify"
        value="center"
        icon={AlignCenter}
        title="Выравнивание по центру"
      />
      <StyleButton
        node={node}
        field="justify"
        value="end"
        icon={AlignRight}
        title="Выравнивание справа"
      />
      <StyleButton
        node={node}
        field="justify"
        value="space-between"
        icon={AlignJustify}
        title="Выравнивание равномерно"
      />
      <StyleDivider />
      <StyleButton
        node={node}
        field="align"
        value="start"
        icon={AlignStartHorizontal}
        isDefault
        title="Вверху строки"
      />
      <StyleButton
        node={node}
        field="align"
        value="center"
        icon={AlignCenterHorizontal}
        title="По центру"
      />
      <StyleButton
        node={node}
        field="align"
        value="end"
        icon={AlignEndHorizontal}
        title="Внизу строки"
      />
    </>
  );
};

const FlexNodeVerticalToolbar: LayoutNodeToolbarComponent<FlexAttributes> = ({
  node,
}) => {
  return (
    <>
      <StyleButton
        node={node}
        field="align"
        value="start"
        icon={AlignLeft}
        isDefault
        title="Выравнивание слева"
      />
      <StyleButton
        node={node}
        field="align"
        value="center"
        icon={AlignCenter}
        title="Выравнивание по центру"
      />
      <StyleButton
        node={node}
        field="align"
        value="end"
        icon={AlignRight}
        title="Выравнивание справа"
      />
    </>
  );
};

const FlexNodeToolbar: LayoutNodeToolbarComponent<FlexAttributes> = ({
  node,
}) => {
  if (node.attributes.direction == "row")
    return <FlexNodeHorizontalToolbar node={node} />;
  return <FlexNodeVerticalToolbar node={node} />;
};

export default FlexNodeToolbar;
