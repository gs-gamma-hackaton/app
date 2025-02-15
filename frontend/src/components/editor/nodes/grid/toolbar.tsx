import { LayoutNodeToolbarComponent } from "@/lib/editor/types";
import {
  AlignCenter,
  AlignCenterHorizontal,
  AlignEndHorizontal,
  AlignLeft,
  AlignRight,
  AlignStartHorizontal,
  Grid2X2Plus,
  StretchHorizontal,
} from "lucide-react";
import { GridAttributes } from ".";
import { StyleButton, StyleDivider, StyleSlider } from "../../ui/input";

const GridNodeToolbar: LayoutNodeToolbarComponent<GridAttributes> = ({
  node,
}) => {
  return (
    <>
      <StyleSlider
        node={node}
        field="columns"
        icon={Grid2X2Plus}
        min={1}
        max={5}
        title="Количество колонок"
      />
      <StyleDivider />
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
        value="stretch"
        icon={StretchHorizontal}
        title="Растягивать"
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

export default GridNodeToolbar;
